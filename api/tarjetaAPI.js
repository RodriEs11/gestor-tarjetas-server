const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const { getTarjetas, getTarjetaById} = require("../services/tarjetaService");



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/tarjetas", (req, res) => {


    getTarjetas().then((resultados) => {

        res.json(resultados);

    }).catch((error) => {

        res.send(error);
    })


})


app.get("/api/tarjetas/:id", (req, res) => {

    const id = req.params.id;

    getTarjetaById(id).then((resultados) => {

        res.json(resultados);

    }).catch((error) => {

        res.send(error);
    })


})


module.exports = app;