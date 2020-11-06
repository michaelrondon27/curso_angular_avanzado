const bcrypt = require('bcryptjs');
const { response } = require('express');
const {OAuth2Client} = require('google-auth-library');

const { googleVerify } = require('../helpers/google-verify');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const googleSingIn = async (req, res = response) => {
    const googleToken = req.body.token;

    const { name, email, picture } = await googleVerify( googleToken );

    try {
        res.json({
            ok: true,
            msg: 'Google Sing In',
            name,
            email,
            picture
        });
    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto'
        });
    }
}

const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            })
        }

        // Generar el token - JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    googleSingIn,
    login
}
