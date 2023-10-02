const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const database = require("../database");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/autores", (req, res) => {


    database.getAutores().then( (resultados) => {

        res.json(resultados);

    }).catch( (error) => {

        res.send(error);
    })
    

})

app.get("/api/autor/:id", (req, res) => {

    const id = req.params.id;

    database.findAutorById(id).then( (resultado) => {


        res.json(resultado);

    }).catch( (error) => {

        res.send(error);
    })
    

})

app.post("/api/autor/agregar", (req,res) => {

    const parametros = req.body;
    const nombre = parametros.nombre;
    
    const autor = {
        nombre:nombre
    }

    database.insertAutor(autor).then( (resultado) => {
        res.send('Autor agregado');
    }).catch( (error) => {
        res.send(error);
    })


})

// ?nombre="nuevoNombre"
app.post("/api/autor/:id/update", (req, res) => {

    const id = req.params.id;
    const nombre = req.query.nombre;

    console.log(id, nombre);
    database.updateAutor(id, nombre).then( (resultado) => {
        res.send('Autor actualizado');
    }).catch( (error) => {
        res.send(error);
    })

})


module.exports = app;