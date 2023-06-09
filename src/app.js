const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { registerPartials } = require("hbs");
require("./db/conn");
const User = require("./models/usermessage");
const { url } = require("inspector");
const app = express();
const port = process.env.PORT || 3000;


const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");


// console.log(path.join(__dirname, "../public"));
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/bootstrap/dist")));
app.use(express.urlencoded({ extended: false }))
app.use(express.static(staticpath))
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath)

app.get("/", (req, res) => {
    res.render("index");
})

app.post("/contact", async(req, res) => {
    try {
        // res.send(req.body);
        const userdata = new User(req.body);
        await userdata.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
})
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
});