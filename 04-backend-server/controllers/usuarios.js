const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const actualizarUsuario = async (req, res = response) => {
    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { email, google, password, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {
            const existeEmail = await Usuario.findOne({ email });

            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        res.status.json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearUsuario = async (req, res = response) => {    
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        } 

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar log'
        });
    }
}

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok: true,
        usuarios
    });
}

module.exports = {
    actualizarUsuario,
    borrarUsuario,
    crearUsuario,
    getUsuarios
}