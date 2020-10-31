const { response } = require('express');

const getTodo = (req, res = response) => {
    const busqueda = req.params.busqueda;

    res.json({
        ok: true,
        msg: 'getTodo',
        busqueda
    })
}

module.exports = {
    getTodo
}
