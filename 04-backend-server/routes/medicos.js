/**
 * Medicos
 * ruta: '/api/medicos'
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { actualizarMedico, borrarMedico, crearMedico, getMedicos } = require('../controllers/medicos');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', getMedicos);

router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'El nombre del médico es necesario').not().isEmpty(),
        validarCampos
    ],
    crearMedico
);

router.put(
    '/:id',
    [],
    actualizarMedico
);

router.delete(
    '/:id',
    borrarMedico
);

module.exports = router;
