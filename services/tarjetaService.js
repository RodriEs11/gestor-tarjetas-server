const express = require("express");
const app = express();
const {database, sendQuery} = require("../database");


const getTarjetas = () => {

    const sql = `SELECT * from tarjeta;`;

    return  sendQuery(sql).then( (response) => {
        return response;
    })
    .catch( (error) => {
        return error;
    })
}

const getTarjetaById = (id) => {

    const sql = `SELECT * from tarjeta WHERE idTarjeta = "${id}";`;

    return  sendQuery(sql).then( (response) => {
        return response;
    })
    .catch( (error) => {
        return error;
    })
}



module.exports = {getTarjetas, getTarjetaById};