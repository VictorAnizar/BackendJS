//como se autentificaran loa usuarios
const jwt = require('express-jwt');
const secret = require('../config').secret;

//recibe una peticion a la API y su inico trabajo es encontrar el jwt que mando el usario
function getTokenFromHeader(req) {
    if (req.headers.authorization &&
        (req.headers.authorization.split(' ')[0] == 'Token' || req.headers.authorization.split(' ')[0] == 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const auth = {
    //usuario autenticado
    requerido: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        getToken: getTokenFromHeader
    }),
    //opcional si el usuario esta autenticado o no
    opcional: jwt({
        secret: secret,
        algorithms: ['HS256'],
        userProperty: 'usuario',
        credentialsRequired: false,
        getToken: getTokenFromHeader
    })
};

module.exports = auth;