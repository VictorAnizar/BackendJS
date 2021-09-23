//vamos a tener la config gral de la app (rutas, variables, etc)
//veremos en que ambiente se está desarrollando 
//si el ambiente es produccuion, el valor de secreto esta en process.env.secret. Si no, el valor de secret será "secret"
module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
  };
//secret es una cadena de texto mediante la cual se generan los JWT's