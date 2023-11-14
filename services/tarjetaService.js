const express = require("express");
const app = express();
const { database, sendQuery } = require("../database");


const getTarjetas = () => {

    const sql = `SELECT * from tarjeta;`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })
}

const getTarjetaById = (id) => {

    const sql = `SELECT * from tarjeta WHERE idTarjeta = "${id}";`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })
}

const addTarjeta = (tarjeta) => {

    const nombre = tarjeta.nombre;
    const limiteTotal = tarjeta.limiteTotal;
    const ultimoCierre = tarjeta.ultimoCierre;
    const vencimiento = tarjeta.vencimiento;
    const proximoCierre = tarjeta.proximoCierre;
    const proximoVencimiento = tarjeta.proximoVencimiento;

    const sql = `INSERT INTO tarjeta (nombre, limiteTotal, ultimoCierre, vencimiento, proximoCierre, proximoVencimiento) VALUES ('${nombre}', '${limiteTotal}','${ultimoCierre}','${vencimiento}','${proximoCierre}', '${proximoVencimiento}');`

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })

}

const updateTarjeta = (idTarjeta, tarjeta) => {

    const nombre = tarjeta.nombre;
    const limiteTotal = tarjeta.limiteTotal;
    const ultimoCierre = tarjeta.ultimoCierre;
    const vencimiento = tarjeta.vencimiento;
    const proximoCierre = tarjeta.proximoCierre;
    const proximoVencimiento = tarjeta.proximoVencimiento;


    const sql = `UPDATE tarjeta SET nombre="${nombre}", limiteTotal="${limiteTotal}", ultimoCierre="${ultimoCierre}", vencimiento="${vencimiento}", proximoCierre="${proximoCierre}", proximoVencimiento="${proximoVencimiento}" WHERE idTarjeta = '${idTarjeta}';`;

    return  sendQuery(sql).then( (response) => {
        return response;
    })
    .catch( (error) => {
        return error;
    })


}



module.exports = { getTarjetas, getTarjetaById, addTarjeta, updateTarjeta};