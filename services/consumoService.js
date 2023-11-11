const express = require("express");
const app = express();
const {database, sendQuery} = require("../database");


const getConsumos = () => {

    const sql = `SELECT * from consumo;`;

    return  sendQuery(sql).then( (response) => {
        return response;
    })
    .catch( (error) => {
        return error;
    })
}

const getConsumoById = (id) => {

    const sql = `SELECT * from consumo WHERE idConsumo = "${id}";`;

    return  sendQuery(sql).then( (response) => {
        return response;
    })
    .catch( (error) => {
        return error;
    })
}



module.exports = {getConsumos, getConsumoById};