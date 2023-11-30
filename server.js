const PORT = process.env.PORT || 3000;

const express = require("express");
const mongoose = require ("mongoose"); // datebase .env: MONGODB_URI=mongodb+srv://janamasayos:Yz26mYtgObEfsxwL@cluster0.ebpoiso.mongodb.net/blog-contes
const Article = require ("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require ("method-override"); // per esborrar articles / contes
const app = express();

mongoose.connect("mongodb://localhost", { // "mongodb://127.0.0.1" peta em demana "yourDatabaseName"
  /* si poso això peta pqqq??
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  createIndexes: true */

});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false})) // necessitem q vagi abans
app.use(methodOverride("_method")); // crida a esborrar 

app.use("/articles", articleRouter);

app.get("/", async (req, res) => { // variable per mostrar articles/contes
    try {
        const articles = await Article.find().sort({ 
            createdAt: "desc" }); // oredanar per oredre de creació
        res.render("articles/index", { articles: articles });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
     console.log(`Servidor ${PORT} funcionat.`);
});

//    console.log(`Servidor 3000 funcionat.`);

