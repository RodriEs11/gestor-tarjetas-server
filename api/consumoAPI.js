const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const {getConsumos, getConsumoById} = require("../services/consumoService");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/consumos", (req, res) => {


    getConsumos().then( (resultados) => {

        res.json(resultados);

    }).catch( (error) => {

        res.send(error);
    })
    

})

app.get("/api/consumos/:id", (req, res) => {

    const id = req.params.id;

    getConsumoById(id).then( (resultados) => {

        res.json(resultados);

    }).catch( (error) => {

        res.send(error);
    })
    

})



/*
app.get("/api/consumos/all", (req, res) => {


    database.getConsumosWithAutorAndCard().then( (resultados) => {

        res.json(resultados);

    }).catch( (error) => {

        res.send(error);
    })
    

})



app.get("/api/consumos/tarjeta/:id", (req, res) => {

    const id = req.params.id;

    database.getConsumosByIdTarjeta(id).then( (resultados) => {

        res.json(resultados);

    }).catch( (error) => {

        res.send(error);
    })
    

})

app.get("/api/consumos/:idConsumo/tarjeta/:idTarjeta", (req, res) => {

    const idAutor = req.params.idConsumo;
    const idTarjeta = req.params.idTarjeta;

    database.getTotalAPagarEnCuotasByAutorAndTarjeta(idAutor, idTarjeta).then( (resultados) => {

        res.json(resultados);

    }).catch( (error) => {

        res.send(error);
    })
    

})



app.post("/consumos/agregar", (req, res) => {

    const parametros = req.body;

    const nombre = parametros.consumo;
    const cantidadCuotas = parametros.cuotas;
    const total = parametros.total;
    const fechaCompra = parametros.fechaCompra;
    const notas = parametros.notas;
    const tarjeta_idTarjeta = parametros.tarjeta;
    const cuotasPagadas = 1;
    const autor_idAutor = parametros.autor;
    
    const consumo = {
        nombre: nombre,
        cantidadCuotas: cantidadCuotas,
        cuotasPagadas: cuotasPagadas,
        total: total,
        fechaCompra: fechaCompra,
        notas: notas,
        tarjeta_idTarjeta:tarjeta_idTarjeta,
        autor_idAutor: autor_idAutor
    }

    console.log(consumo);

    database.insertConsumo(consumo).then( (result) => {

        res.sendStatus(200);

    })
    .catch( (error) => {
        res.json(`${error}`);

    });
   


})


*/

module.exports = app;