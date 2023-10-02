const express = require("express");
const app = express();
const PORT = 3001;
const Path = require("path");

app.use(express.static(__dirname));
app.use(express.static(Path.join(__dirname,"public")));

app.use(require("./api/autor"));
app.use(require("./api/tarjeta"));
app.use(require("./api/consumo"));

app.listen(PORT, () => {

    console.log(`Aplicación corriendo en http://localhost:${PORT}`);

});

app.get("/consumos", (req, res) => {
    res.sendFile(Path.join(__dirname,"public", "consumos.html"));
})

app.get("/tarjeta/visa", (req, res) => {
    res.sendFile(Path.join(__dirname,"public", "tarjeta.html"));
})


module.exports = app;

