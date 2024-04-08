const express = require("express");
const handlebars = require("express-handlebars").engine;
const bodyParser = require("body-parser");

const cliente = require("./models/post")

const app = express();

app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.render("cadastro")
})

app.get("/consulta", function (req, res) {
    cliente.findAll()
    .then(function (cliente) {
        res.render("consulta", {cliente})
    })
    .catch(function (erro) {
        res.send("Erro ao consultar: "+ erro)
    })
})

app.post("/cadastrar", function (req, res) {
    cliente.create({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }).then(function () {
        res.redirect("/consulta")
    })
    .catch(function (erro) {
        res.send("Erro ao cadastrar: "+ erro)
    })
})

app.get("/excluir/:id", function (req, res) {

    cliente.destroy({where: {id: req.params.id}})
    .then(function () {
        res.redirect("/consulta")
    })
    .catch(function (erro) {
        res.send("Erro ao excluir: "+ erro)
    })
    
})

app.get("/editar/:id", function (req, res) {
    cliente.findAll({where: {id: req.params.id}})
    .then(function (cliente) {
        res.render("editar", {cliente})
    })
    .catch(function (erro) {
        res.send("Erro ao consultar: "+ erro)
    })
})

app.post("/atualizar", function (req, res) {
    cliente.update({
        nome: req.body.nome,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cep: req.body.cep,
        cidade: req.body.cidade,
        estado: req.body.estado
    }, {where: {id: req.body.id}}).then(function () {
        res.redirect("/consulta")
    })
    .catch(function (erro) {
        res.send("Erro ao atualizar: "+ erro)
    })
})


app.listen(8081, function () {
    console.log("Servidor ativo!")
})
