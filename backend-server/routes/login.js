var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

var app = express();

var Usuario = require('../models/usuario');

const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

//========================
// Autenticación de Google
//========================
app.post('/google', (req, res, next) => {

    var token = req.body.token;

    const oAuth2Client = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_SECRET
    );

    const ticket = oAuth2Client.verifyIdToken({
        idToken: token
            //audience: GOOGLE_CLIENT_ID
    });

    ticket.then(data => {

        Usuario.findOne({ email: data.payload.email }, (err, usuario) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar usuario',
                    errors: err
                });
            }

            if (usuario) {

                if (!usuario.google) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Debe de usar su atenticación normal'
                    });
                } else {

                    // Crear token
                    usuario.password = ':)';
                    var token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 }); // 4 horas

                    res.status(200).json({
                        ok: true,
                        usuario: usuario,
                        id: usuario._id,
                        token: token
                    });

                }

            } else {

                var usuario = new Usuario();

                usuario.nombre = data.payload.name;
                usuario.email = data.payload.email;
                usuario.password = ':)';
                usuario.img = data.payload.picture;
                usuario.google = true;

                usuario.save((err, usuarioDB) => {

                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al crear usuario',
                            errors: err
                        });
                    }

                    // Crear token
                    var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

                    res.status(200).json({
                        ok: true,
                        usuario: usuarioDB,
                        id: usuarioDB._id,
                        token: token
                    });

                });

            }

        });

    });

});

//=====================
// Autenticación normal
//=====================

app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear token
        usuarioDB.password = ':)';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            id: usuarioDB._id,
            token: token
        });

    });

});

module.exports = app;