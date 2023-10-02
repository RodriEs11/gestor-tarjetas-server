const mysql = require("mysql");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, "keys.env") });


const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const database = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: dbName
});

database.connect((err) => {

    if (err) throw err;

    console.log("Conexión establecida con al base de datos");

});


function findTarjetaById(id) {

    let sql = `SELECT * FROM tarjetas.tarjeta WHERE idTarjeta = ${id};`;

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            objeto = Object.values(JSON.parse(JSON.stringify(result)));

            resolve(objeto);

        })


    })

}

function insertAutor(autor) {

    const nombre = autor.nombre;

    let sql = `INSERT INTO autor(nombre) VALUES('${nombre}');`

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            resolve(result);

        })


    })

}
function insertTarjeta(tarjeta) {

    const nombre = tarjeta.nombre;
    const limiteActual = tarjeta.limiteActual;
    //const limiteDisponible = tarjeta.limiteDisponible;
    const cierreAnterior = tarjeta.cierreAnterior;
    const cierreActual = tarjeta.cierreActual;
    const vencimientoAnterior = tarjeta.vencimientoAnterior;
    const vencimientoActual = tarjeta.vencimientoActual;
    const totalVencimientoAnterior = tarjeta.totalVencimientoAnterior;
    const totalVencimientoActual = tarjeta.totalVencimientoActual;

    let sql = `INSERT INTO tarjeta(nombre, limiteActual, cierreAnterior, cierreActual, vencimientoAnterior, vencimientoActual, totalVencimientoAnterior, totalVencimientoActual) VALUES ('${nombre}',${limiteActual},'${cierreAnterior}','${cierreActual}','${vencimientoAnterior}','${vencimientoActual}',${totalVencimientoAnterior},${totalVencimientoActual});`;

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            resolve(result);

        })


    })


}

function insertConsumo(consumo) {

    const nombre = consumo.nombre;
    const cantidadCuotas = consumo.cantidadCuotas;
    const total = consumo.total;
    const fechaCompra = consumo.fechaCompra;
    const notas = consumo.notas;
    const tarjeta_idTarjeta = consumo.tarjeta_idTarjeta;
    const autor_idAutor = consumo.autor_idAutor;

    let sql = `INSERT INTO consumo(nombre, cantidadCuotas, total, fechaCompra, notas, tarjeta_idTarjeta, autor_idAutor) VALUES ('${nombre}',${cantidadCuotas},${total},'${fechaCompra}','${notas}',${tarjeta_idTarjeta}, ${autor_idAutor});`;

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            resolve(result);

        })


    })


}

function getConsumos() {

    let sql = 'SELECT * FROM consumo;';

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            objeto = Object.values(JSON.parse(JSON.stringify(result)));
            resolve(objeto);

        })


    })

}

function getTarjetas() {

    let sql = 'SELECT * FROM tarjeta;';

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            objeto = Object.values(JSON.parse(JSON.stringify(result)));
            resolve(objeto);

        })


    })

}


function getAutores() {

    let sql = 'SELECT * FROM autor;';

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            objeto = Object.values(JSON.parse(JSON.stringify(result)));
            resolve(objeto);

        })


    })

}


function findAutorById(id) {

    let sql = `SELECT * FROM tarjetas.autor WHERE idAutor = ${id};`;

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            objeto = Object.values(JSON.parse(JSON.stringify(result)));

            resolve(objeto);

        })


    })

}

function findConsumoById(id) {

    let sql = `SELECT * FROM consumo WHERE idConsumo = ${id};`;

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);

            objeto = Object.values(JSON.parse(JSON.stringify(result)));

            resolve(objeto);

        })


    })

}

function updateAutor(id, nombre) {

    let sql = `UPDATE autor SET nombre = '${nombre}' WHERE idAutor = ${id};`;

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);
            resolve(result);

        })


    })

}

function setTarjetaLimiteDisponible(id, disponible) {

    let sql = `UPDATE tarjeta SET limiteDisponible = ${disponible} WHERE idTarjeta = ${id};`;
    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);
            resolve(result);

        })


    })

}

function updateTarjeta(id, tarjeta) {


    const nombre = tarjeta.nombre;
    const limiteActual = tarjeta.limiteActual;
    const limiteDisponible = tarjeta.limiteDisponible;
    const cierreAnterior = new Date(tarjeta.cierreAnterior).toLocaleDateString('yyy-mm-dd');
    const cierreActual = new Date(tarjeta.cierreActual).toLocaleDateString('yyy-mm-dd');
    const vencimientoAnterior = new Date(tarjeta.vencimientoAnterior).toLocaleDateString('yyy-mm-dd');
    const vencimientoActual = new Date(tarjeta.vencimientoActual).toLocaleDateString('yyy-mm-dd');
    const totalVencimientoAnterior = tarjeta.totalVencimientoAnterior;
    const totalVencimientoActual = tarjeta.totalVencimientoActual;

    console.log(tarjeta);

    let sql = `UPDATE tarjeta SET nombre = '${nombre}', limiteActual = '${limiteActual}', limiteDisponible = '${limiteDisponible}', cierreAnterior = '${cierreAnterior}', cierreActual = '${cierreActual}', vencimientoAnterior = '${vencimientoAnterior}', vencimientoActual = '${vencimientoActual}',  totalVencimientoAnterior = '${totalVencimientoAnterior}', totalVencimientoActual = '${totalVencimientoActual}' WHERE idTarjeta = ${id};`;

    return new Promise((resolve, reject) => {

        database.query(sql, (error, result, fields) => {
            if (error) reject(error);
            resolve(result);

        })


    })

}


module.exports = { database, setTarjetaLimiteDisponible, insertAutor, insertTarjeta, insertConsumo, getConsumos, getTarjetas, getAutores, findTarjetaById, findAutorById, findConsumoById, updateAutor, updateTarjeta };
