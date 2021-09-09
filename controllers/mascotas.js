/*  Archivo controllers/Mascotas.js
 *  Simulando la respuesta de objetos Mascota
 *  en un futuro aquí se utilizarán los modelos
 */

//importamos mongoose
const mongoose = require('mongoose');
//importamos el modelo definido en mongoose
const Mascota = mongoose.model("Mascota");

//A partir de lo AuthenticatorAssertionResponse, de genera la persistencia en los datos

function crearMascota(req, res, next) {
  //El cliente nos manda esa mascota en el body
  var mascota = new Mascota(req.body);
  //La mascota generada a partir de la info mandada, la guarda en la BD
  //Se debe de tratar con errores porque pueden surgir en cualquier momento
  mascota.save()
  //En caso de que TODO haya salido bien
  .then( mas => {
    //Se manda un estatus y se manda a la mascota
    res.status(200).send(mas);
  })
  //En caso de algun error
  //Dejamos que mongoose responda
  //Se usa el parametro next para modelar el paso siguiente
  .catch(next);
}
//Lo anterior genera persistencia de datos

function obtenerMascotas(req, res) {
  // Simulando dos Mascotas y respondiendolos
  var mascota1 = new Mascota(1, 'Rocky', 'Perro', 'foto.png', 'Pitbul color miel', 'anunciante1', 'CDMX')
  var mascota2 = new Mascota(2, 'Mamba', 'Perro', 'foto.png', 'Pitbul color gris', 'anunciante1', 'CDMX')
  res.send([mascota1, mascota2])
}

function modificarMascota(req, res) {
  // simulando un Mascota previamente existente que el cliente modifica
  var mascota1 = new Mascota(req.params.id, 'Rocky', 'Perro', 'foto.png', 'Pitbul color miel', 'anunciante1', 'CDMX')
  var modificaciones = req.body
  mascota1 = { ...mascota1, ...modificaciones }
  res.send(mascota1)
}

function eliminarMascota(req, res) {
  // se simula una eliminación de Mascota, regresando un 200
  res.status(200).send(`Mascota ${req.params.id} eliminado`);
}

// exportamos las funciones definidas
module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota
}
