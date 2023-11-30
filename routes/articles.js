const express = require("express");
const Article = require("../models/article");

const router = express.Router();

// crear nou post 
router.get("/nou", (req, res) => {
    res.render ("articles/nou", { article: new Article()})
});

// editar post
router.get("/editar/:id", async (req, res) => {
    const article = await Article.findById( req.params.id );    
    res.render ("articles/editar", { article: article })
});

router.put ("/:id")


// per fer q en compte de la id (molts números) al link hi aparegui el títol de l'article/conte posem slug
router.get("/:slug", async (req, res) => { // async sempre retorna una promesa: sol·licituds a servidors, lectures/escriptures de fitxers o qualsevol tasca que triguí temps.
    const article = await Article.findOne({ slug: req.params.slug });// si posem només .find ens torna un array i genera un error
    if (article == null) res.redirect("/") // "/" home page
    res.render ("articles/mostrar", {article: article})
});

// veure post
router.post("/", async (req, res, next) => {
    req.article = new Article();
    next();
} , guardarArticleIRedireccionar("nou"));

// veure 
router.put("/:id", async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, guardarArticleIRedireccionar("editar"));

// eliminar post
router.delete("/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

// guadar i rediccionar

function guardarArticleIRedireccionar (path) {
    return async (req, res) => {
        let article = req.article  // const dòna error 
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try {
            article = await article.save(); // en donarà id del nou article
            res.redirect (`articles/ ${ article.slug }`); // cada cop q passi un article si no és nou anirà per id
        }   catch (e) {
            res.render(`articles/${path}`, { article: article });
        }
    }
}

module.exports = router;