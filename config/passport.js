//config necesaria para que passport funcione
//jalamos la dependencia
const passport = require('passport');

//usamos la estrategia que nos ofrece passport (no es la unica, existen varias)
const LocalStrategy = require('passport').Strategy;

//jalamos mongoose
const mongoose = require('mongoose');

//necesitamos saber que usario usa cierto servicio
const Usuario = mongoose.model('Usuario');

passport.use('local', new LocalStrategy({                            //Configurando elementos utilizados para habilitar sesión.
    usernameField: 'email',
    passwordField: 'password'
  }, function (email, password, done) {
    Usuario.findOne({ email: email }).then(function (user) {
      if (!user || !user.validarPassword(password)) {
        return done(null, false, { errors: { 'email o contraseña': 'equivocado(a)' } });
      }
      return done(null, user);
    }).catch(done);
  }));
//el primer param es una estrateeegia
// passport.use(
//     new LocalStrategy(
//         //recibe un JSON
//         //campos con los cuales vamos a reconocer que usuario esta usando la app
//         {
//             usernameField: 'email',
//             passwordField: 'password'
//         },
//     //segundo parametro para decir cómo va a autentificar
//     function(email, password, next){
//         //encuentra al primer usuario que tenga ese ID
//         Usuario.findOne({ email: email})
//         .then(function(user){
//             //sobre el usuario que encontro
//             //si no existe el usuario o la pass no es valida 
//             if(!user || !user.validarPassword(password)){
//                 return next(null, false, {error : {'email o contraseña incorrecta': 'equivocado(a)'}});
//             }
//             return next(null, user);
//         })
//         .catch(next)
//     }
//     )
// );