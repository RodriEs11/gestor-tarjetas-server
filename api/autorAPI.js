const express = require("express");
const app = express();
const bodyParser = require("body-parser")

const { getAutores, getAutorById, addAutor, updateAutor, obtenerPagarTotalAutor} = require("../services/autorService");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/autores", (req, res) => {

    getAutores().then((response) => {

        res.json(response)

    }).catch((error) => {

        res.json(error);

    });

})

app.get("/api/autores/:id", (req, res) => {

    const id = req.params.id;
    const idValido = !isNaN(id);

    if (!idValido) return res.send("Ingrese un ID válido");

    getAutorById(id).then((response) => {

        res.json(response);

    }).catch((error) => {

        res.send(error);
    });

})

app.post("/api/autores/agregar", (req, res) => {

    const parametros = req.body;
    const nombre = parametros.nombre;

    addAutor(nombre).then((response) => {
        console.log("Se ha agregado un autor");
        res.sendStatus(200);
    }).catch(() => {
        res.sendStatus(500);
    })


})

app.post("/api/autores/editar/:id", (req, res) => {

    const id = req.params.id;
    const nombre = req.body.nombre;

    console.log("Actualizando autor...")
    updateAutor(id, nombre).then((resultado) => {
        res.json({
            idAutor: id,
            nombre: nombre,
        });

        console.log("Autor actualizado: " + resultado)
    }).catch((error) => {
        res.sendStatus(500);
        console.log("Error al actualizar: " + error)
    })

})


app.get("/api/autores/:id/total-a-pagar", (req, res) => {

    const id = req.params.id;
    const idValido = !isNaN(id);

    if (!idValido) return res.send("Ingrese un ID válido");

    obtenerPagarTotalAutor(id).then((response) => {

        res.json(response[0]); /* 0 -> DEVUELVE SOLAMENTE EL VALOR, SIN RETORNAR INFORMACION EXTRA DE LA DB*/

    }).catch((error) => {

        res.send(error);
    });

})


module.exports = app;