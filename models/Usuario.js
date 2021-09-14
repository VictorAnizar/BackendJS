// // Usuario.js
// /** Clase que representa a un usuario de la plataforma*/
// class Usuario {
//     constructor(id, username, nombre, apellido, email, password, tipo) {
//       this.id = id;
//       this.username = username;
//       this.nombre = nombre;
//       this.apellido = apellido;
//       this.email = email;
//       this.password = password;
//       this.tipo = tipo; // tipo normal o anunciante
//     }
//   }
//   module.exports = Usuario;
//jalamos mongoose
const mongoose = require('mongoose');
// const uniqueValidator=require('mongoose-unique-validator');
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const secret = require('../config').secret;
//generamos un esquema, por cada modelo se define un esquema. 
//Recibe 2 objetos: el primero es un objeto qcon todos los campos para crear un usuario
//el segundo parametro es un objeto de config con dos params: la coleccion de la BD y timestamp(guarda los logs)
const UsuarioScheme = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "No puede estar vacío el campo username"],
    lowercase: true,
    match: [/^[a-z0-9]+$/, "Username no valido"], 
    index: true
  },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/\S+@\S.\S+/, "Email no válido"],
    index: true
  },
  //la contraseña ya no va a estar aqui
  // password: { type: String, required: true },
  tipo: {type: String, enum:['normal', 'anunciante'], required: true},
  hash: String,
  salt: String
}, { collection: "Usuarios", timestamps: true });
// nos aseguramos de que la info proporcionada es unica
//Verifica que los campos que tienen unique, realmente sean unicos 
// UsuarioScheme.plugin(uniqueValidator, {message: "Ya existe"});

//se necesita una funcion para indicar cuáles atributos son publicos y, por lo tanto, son accesibles para todos los usuarios
//Siempre que se defina un esquema se tiene que definir este metodo "public data"
// UsuarioScheme.methods.publicData = () => {
//   return {
//     id: this.id,
//     username: this.username,
//     nombre: this.nombre,
//     apellido: this.apellido,
//     email: this.email,
//     tipo: this.tipo
//   }
// }
// UsuarioScheme.methods.crearPassword = function (password){
//   //genera una cadena random de longitu 16
//   this.salt = crypto.randomBytes(16).toString('hex');
//   //funcion de cifrado que permite cifrar la contraseña
//   this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// }

// UsuarioScheme.methods.validarPassword = function(password){
//   const newHash=crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//   return this.hash===newHash;
// }

// UsuarioScheme.methods.generaJWT=function(){
//   const today = new Date();
//   const exp = new Date(today);
//   //ne 60 dias expira el jwt
//   exp.setDate(today.getDate()+60);
//   return jwt.sign({
//     id: this._id,
//     username: this.username,
//     exp: parseInt(exp.getTime()/1000)
//   }, secret)
// }

// UsuarioScheme.methods.toAuthJSON = function (){
//   return {
//     username: this.username,
//     email: this.email,
//     token: this.generaJWT()
//   };
// }
//Los attr anteriores son accesibles para todos. "Password" no es accesible para todo el mundo
//cada que en JS hablemos de "Usuario", nos referimos al esquema
mongoose.model("Usuario", UsuarioScheme);