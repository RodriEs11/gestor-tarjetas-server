const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const { getConsumos, getConsumoById, addConsumo, pagarProximaCuota} = require("../services/consumoService");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/consumos", (req, res) => {


    getConsumos().then((resultados) => {

        res.json(resultados[0]); // 0 -> Para no mostrar el retorno de MySql, solamente los valores de los consumos 


    }).catch((error) => {
        console.log(error);
        res.send(error);
    })


})

app.get("/api/consumos/:id", (req, res) => {

    const id = req.params.id;

    getConsumoById(id).then((resultados) => {

        res.json(resultados);

    }).catch((error) => {
        console.log(error);
        res.send(error);
    })


})


app.post("/api/consumos/agregar", (req, res) => {


    const consumo = {
        idTarjeta: req.body.tarjeta,
        idAutor: req.body.autor,
        nombre: req.body.consumo,
        montoTotal: req.body.montoTotal,
        cantidadCuotas: req.body.cantCuotas,
        fechaCompra: req.body.fechaCompra,
        notas: req.body.notas
    }

   
    addConsumo(consumo).then((resultados) => {
        console.log("Se ha agregado un consumo");
        res.json(resultados);
    }).catch((error) => {
        console.log(error);
        res.send(error);
    })

})

app.post("/api/consumos/pagar-proxima-cuota/:idDetalleCuotas", (req, res) => {

    const idDetalleCuotas = req.params.idDetalleCuotas;
      
    pagarProximaCuota(idDetalleCuotas).then((resultados) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    })

})

module.exports = app;