/**
 * Hospitales
 * ruta: '/api/hospitales'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { actualizarHospital, borrarHospital, crearHospital, getHospitales } = require('../controllers/hospitales');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getHospitales);

router.post(
    '/',
    [],
    crearHospital
);

router.put(
    '/:id',
    [],
    actualizarHospital
);

router.delete(
    '/:id',
    borrarHospital
);

module.exports = router;
