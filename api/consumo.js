const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const database = require("../database");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/consumos", (req, res) => {


    database.getConsumos().then( (resultados) => {

        res.json(resultados);

    }).catch( (error) => {

        res.send(error);
    })
    

})

app.get("/api/consumos/:id", (req, res) => {

    const id = req.params.id;

    database.findConsumoById(id).then( (resultados) => {

        
        res.json(resultados);

    }).catch( (error) => {

        res.send(error);
    })
    

})


app.post("/api/consumos/agregar", (req, res) => {

    const parametros = req.body;

    const nombre = parametros.consumo;
    const autor = parametros.autor;
    const cantidadCuotas = parametros.cuotas;
    const total = parametros.total;
    const fechaCompra = parametros.fechaCompra;
    const notas = parametros.notas;
    const tarjeta_idTarjeta = parametros.tarjeta;
    const autor_idAutor = 1;
    
    
    const consumo = {
        nombre: nombre,
        autor: autor,
        cantidadCuotas: cantidadCuotas,
        total: total,
        fechaCompra: fechaCompra,
        notas: notas,
        tarjeta_idTarjeta:tarjeta_idTarjeta,
        autor_idAutor: autor_idAutor
    }

    console.log(consumo);

    database.insertConsumo(consumo).then( (result) => {

        res.redirect("api/consumos");

    })
    .catch( (error) => {
        res.json(`${error}`);

    });
   


})




module.exports = app;