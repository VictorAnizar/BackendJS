// // Solicitud.js
// /** Clase que representa una solicitud de adopción */
// class Solicitud {
//     constructor(id, idMascota, fechaDeCreacion, idUsuarioAnunciante, idUsuarioSolicitante, estado) {
//       this.id = id;
//       this.idMascota = idMascota;
//       this.fechaDeCreacion = fechaDeCreacion;
//       this.idUsuarioAnunciante = idUsuarioAnunciante;
//       this.idUsuarioSolicitante = idUsuarioSolicitante;
//       this.estado = estado;
//     }

//   }

//   module.exports = Solicitud;

//jalamos mongoose
const mongoose = require('mongoose');
//generamos un esquema, por cada modelo se define un esquema. 
//Recibe 2 objetos: el primero es un objeto qcon todos los campos para crear un usuario
//el segundo parametro es un objeto de config con dos params: la coleccion de la BD y timestamp(guarda los logs)
const SolicitudScheme = new mongoose.Schema({
  idMascota: { type: mongoose.Schema.Types.ObjectId, ref: "Mascota" },
  fechaDeCreacion: Date,
  idUsuarioAnunciante: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  idUsuarioSolicitante: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  estado: { type: String, enum: ['Aceptada', 'Rechazada', 'Pendiente'] }
}, { collection: "Solicitudes", timestamps: true });

//se necesita una funcion para indicar cuáles atributos son publicos y, por lo tanto, son accesibles para todos los usuarios
//Siempre que se defina un esquema se tiene que definir este metodo "public data"
SolicitudScheme.methods.publicData = () => {
  return {
    id: this.id,
    idMascota: this.idMascota,
    fechaDeCreacion: this.fechaDeCreacion,
    idUsuarioAnunciante: this.idUsuarioAnunciante,
    idUsuarioSolicitante: this.idUsuarioSolicitante,
    estado: this.estado
  }
}
//Los attr anteriores son accesibles para todos. "Password" no es accesible para todo el mundo
//cada que en JS hablemos de "Usuario", nos referimos al esquema
mongoose.model("Solicitud", SolicitudScheme);