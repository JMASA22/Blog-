const mongoose = require ("mongoose");
const markedd = require("marked"); // per fer q en compte de la id (molts números) al link hi aparegui el títol de l'article/conte
const slugify = require("slugify")
const createDomPurify = require("dompurify");
const {JSDOM} = require ("jsdom"); // {} pq només volem aquesta "porció" exacte..no sé q polles vol dir això 
const dompurify = createDomPurify (new JSDOM().window); // purificar coses

const articleSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description:{
        type: String,
        require: true
    },
    markdown:{
        type: String,
        require: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        require: true,
        unique: true // no podem tenir el mateix nom per a dos articles/contes
    },
    sanitizedHtml: {
        type: String,
        require: true
    }
});

// validacions abans de crear els atributs:
articleSchema.pre("validate", function (next){
    if (this.title){
        this.slug = slugify(this.title, { 
            lower:true, strict: true });
    }
    if (this.markdown) {
        // purificar HTLM, no codi maliciòos
        this.sanitizedHtml =  dompurify.sanitize (marked(this.markdown));
    }
});

module.exports = mongoose.model("Article", articleSchema);