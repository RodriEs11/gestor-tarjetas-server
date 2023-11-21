const express = require("express");
const app = express();
const { database, sendQuery } = require("../database");


const getConsumos = () => {

    const sql = `CALL obtenerConsumos()`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })
}

const getConsumoById = (id) => {

    const sql = `SELECT * from consumo WHERE idConsumo = "${id}";`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })
}

const addConsumo = (consumo) => {

    const idTarjeta = consumo.idTarjeta;
    const idAutor = consumo.idAutor;
    const nombre = consumo.nombre;
    const montoTotal = consumo.montoTotal;
    const cantidadCuotas = consumo.cantidadCuotas;
    const fechaCompra = consumo.fechaCompra;
    const notas = consumo.notas;
    
    const sql = `CALL agregarConsumo('${idTarjeta}', '${idAutor}', '${nombre}', '${montoTotal}', '${cantidadCuotas}', '${fechaCompra}', '${notas}');`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })
}

const pagarProximaCuota = (idDetallCuotas) => {

    const sql = `CALL pagarProximaCuota('${idDetallCuotas}');`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })
}


module.exports = { getConsumos, getConsumoById, addConsumo, pagarProximaCuota};