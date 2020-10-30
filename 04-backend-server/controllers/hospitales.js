const { response } = require('express');

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
}

const crearHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearHospital'
    });
}

const getHospitales = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getHospitales'
    });
}

module.exports = {
    actualizarHospital,
    borrarHospital,
    crearHospital,
    getHospitales
}
