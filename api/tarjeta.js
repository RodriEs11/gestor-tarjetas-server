const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const database = require("../database");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/tarjetas", (req, res) => {


    database.getTarjetas().then((resultados) => {

        res.json(resultados);

    }).catch((error) => {

        res.send(error);
    })


})


app.get("/api/tarjetas/:id", (req, res) => {

    const id = req.params.id;

    database.findTarjetaById(id).then((resultados) => {

        res.json(resultados);

    }).catch((error) => {

        res.send(error);
    })


})


app.post("/api/tarjetas/:id/update", (req, res) => {

    const id = req.params.id;
    const parametros = req.body;

    const nombre = parametros.nombre;
    const limiteActual = parametros.limiteActual;
    const limiteDisponible = parametros.limiteDisponible;
    const cierreAnterior = parametros.cierreAnterior;
    const cierreActual = parametros.cierreActual;
    const vencimientoAnterior = parametros.vencimientoAnterior;
    const vencimientoActual = parametros.vencimientoActual;
    const totalVencimientoAnterior = parametros.totalVencimientoAnterior;
    const totalVencimientoActual = parametros.totalVencimientoActual


    const tarjeta = {
        nombre: nombre,
        limiteActual: limiteActual,
        limiteDisponible: limiteDisponible,
        cierreAnterior: cierreAnterior,
        cierreActual: cierreActual,
        vencimientoAnterior: vencimientoAnterior,
        vencimientoActual: vencimientoActual,
        totalVencimientoAnterior: totalVencimientoAnterior,
        totalVencimientoActual: totalVencimientoActual
    }


    database.updateTarjeta(id, tarjeta).then((resultado) => {
        res.send('Tarjeta actualizada');
    }).catch((error) => {
        res.send(error);
    })


})

app.post("/api/tarjetas/agregar", (req, res) => {

    const parametros = req.body;

    const nombre = parametros.nombre;
    const limiteActual = parametros.limiteActual;
    //const limiteDisponible = parametros.limiteDisponible;
    const cierreAnterior = parametros.cierreAnterior;
    const cierreActual = parametros.cierreActual;
    const vencimientoAnterior = parametros.vencimientoAnterior;
    const vencimientoActual = parametros.vencimientoActual;
    const totalVencimientoAnterior = parametros.totalVencimientoAnterior;
    const totalVencimientoActual = parametros.totalVencimientoActual


    const tarjeta = {
        nombre: nombre,
        limiteActual: limiteActual,
        //limiteDisponible: limiteDisponible,
        cierreAnterior: cierreAnterior,
        cierreActual: cierreActual,
        vencimientoAnterior: vencimientoAnterior,
        vencimientoActual: vencimientoActual,
        totalVencimientoAnterior: totalVencimientoAnterior,
        totalVencimientoActual: totalVencimientoActual
    }


    database.insertTarjeta(tarjeta).then((resultado) => {

        res.send('Tarjeta agregada');

    })
        .catch((error) => {
            res.json(`${error}`);

        });

})


app.post("/api/tarjetas/:id/set/limiteDisponible/:limite", (req, res) => {

    const id = req.params.id;
    const limiteNuevo = parseInt(req.params.limite);

    database.setTarjetaLimiteDisponible(id, limiteNuevo).then( (resultado) => {

        res.send("Nuevo límite de tarjeta actualizado");
    }).catch( (error)=> {
        res.send(error);
    })




})
module.exports = app;