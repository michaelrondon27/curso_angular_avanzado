/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { crearUsuario, getUsuarios } = require('../controllers/usuarios');

const router = Router();

router.get('/', getUsuarios);
router.post('/', crearUsuario);

module.exports = router;
