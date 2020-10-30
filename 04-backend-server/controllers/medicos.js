const { response } = require('express');

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    });
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarMedico'
    });
}

const crearMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'crearMedico'
    });
}

const getMedicos = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getMedicos'
    });
}

module.exports = {
    actualizarMedico,
    borrarMedico,
    crearMedico,
    getMedicos
}
