const { database, sendQuery } = require("../database");


const getAutores = () => {

    const sql = `SELECT * from autor;`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })
}


const getAutorById = (id) => {

    const sql = `SELECT * from autor WHERE idAutor = "${id}";`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })
}

const addAutor = (nombre) => {

    const sql = `INSERT INTO autor (nombre) VALUES ('${nombre}')`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })


}


const updateAutor = (id, nuevoNombre) => {


    const sql = `UPDATE autor SET nombre="${nuevoNombre}" WHERE idAutor = "${id}";`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })


}

const obtenerPagarTotalAutor = (idAutor) => {

    const sql = `CALL obtenerPagarTotalAutor('${idAutor}')`;

    return sendQuery(sql).then((response) => {
        return response;
    })
        .catch((error) => {
            return error;
        })

}

module.exports = { getAutores, getAutorById, addAutor, updateAutor, obtenerPagarTotalAutor };