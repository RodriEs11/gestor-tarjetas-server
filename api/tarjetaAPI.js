const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const { getTarjetas, getTarjetaById, addTarjeta, updateTarjeta } = require("../services/tarjetaService");



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

app.post("/api/tarjetas/agregar", (req, res) => {

    const nombre = req.body.nombre;
    const limiteTotal = req.body.limiteTotal;
    const ultimoCierre = req.body.ultimoCierre;
    const vencimiento = req.body.vencimiento;
    const proximoCierre = req.body.proximoCierre;
    const proximoVencimiento = req.body.proximoVencimiento;

    const tarjeta = {
        nombre: nombre,
        limiteTotal: limiteTotal,
        ultimoCierre: ultimoCierre,
        vencimiento: vencimiento,
        proximoCierre: proximoCierre,
        proximoVencimiento: proximoVencimiento

    }

    addTarjeta(tarjeta).then((resultados) => {

        res.sendStatus(200);

    }).catch((error) => {

        res.sendStatus(500);
    })



})


app.post("/api/tarjetas/editar/:id", (req, res) => {

    const idTarjeta = req.params.id;

    const tarjetaNueva = {
        idTarjeta: idTarjeta,
        nombre: req.body.nombre,
        limiteTotal: req.body.limiteTotal,
        ultimoCierre: req.body.ultimoCierre,
        vencimiento: req.body.vencimiento,
        proximoCierre: req.body.proximoCierre,
        proximoVencimiento: req.body.proximoVencimiento
    }

    console.log("Actualizando tarjeta...")
    updateTarjeta(idTarjeta, tarjetaNueva).then((resultado) => {

        res.json(tarjetaNueva);

        console.log("Tarjeta actualizada: " + resultado)
    }).catch((error) => {
        res.sendStatus(500);
        console.log("Error al actualizar: " + error)
    })

})



module.exports = app;