const express = require("express");
const app = express();
const PORT = 3001;
const Path = require("path");

app.use(express.static(__dirname));
app.use(express.static(Path.join(__dirname,"public")));

app.use(require("./api/autorAPI"));
app.use(require("./api/consumoAPI"));
app.use(require("./api/tarjetaAPI"));





app.listen(PORT, () => {

    console.log(`Aplicación corriendo en http://localhost:${PORT}`);

});


module.exports = app;

