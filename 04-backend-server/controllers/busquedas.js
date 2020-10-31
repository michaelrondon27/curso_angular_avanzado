const { response } = require('express');

const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ hospitales, medicos, usuarios] = await Promise.all([
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Usuario.find({ nombre: regex })
    ]);

    res.json({
        ok: true,
        hospitales,
        medicos,
        usuarios
    })
}

module.exports = {
    getTodo
}
