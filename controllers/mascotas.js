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
    .then(mas => {
      //Se manda un estatus y se manda a la mascota
      res.status(200).send(mas);
    })
    //En caso de algun error
    //Dejamos que mongoose responda
    //Se usa el parametro next para modelar el paso siguiente
    .catch(next);
}
//Lo anterior genera persistencia de datos

function obtenerMascotas(req, res, next) {
  //Se tiene que definir dos comportamientos: Obtencion de todos los registros y obtencion de uno solo
  //vemos si en los parametros del usuario, hay un campo ID. En caso afirmativo, esta buscando un registro en especifico
  if (req.params.id) { 
    //Se busca directamente la mascota
    Mascota.findById(req.params.id)
      //Si sale bien, se manda el registro
      .then(
        mas => {res.send(mas)}
      )
      //Si sale mal se deja que mongoose responda
      .catch(next);
  }
  //Si la peticion no incluye un ID, el cliente busca todos los registros
  else {
    //Trae toda la info de la coleccion a la que se esta haciendo referencia
    Mascota.find()
      //Si sale bien, se regresan los datos
      .then(mascotas => res.send(mascotas))
      //Si sale mal, mongoose responde
      .catch((next));
  }
}

function modificarMascota(req, res, next) {
  //Buscamos primero la mascota
  Mascota.findById(req.params.id)
    .then(mascota => {
      //Vemos si realmente existe la mascota
      //Si es Undefined
      if (!mascota) {
        return res.sendStatus(401);
      }
      //Si sí existe, obtenemos lo que nos manda el usuario
      let nuevaInfo = req.body;
      //Si se desea cambiar el nombre
      if (typeof nuevaInfo.nombre !== "undefined") {
        mascota.nombre = nuevaInfo.nombre
      }
      //Si se desea cambiar el categoria
      if (typeof nuevaInfo.categoria !== "undefined") {
        mascota.categoria = nuevaInfo.categoria
      }
      //Si se desea cambiar el foto
      if (typeof nuevaInfo.foto !== "undefined") {
        mascota.foto = nuevaInfo.foto
      }
      //Si se desea cambiar el descripcion
      if (typeof nuevaInfo.descripcion !== "undefined") {
        mascota.descripcion = nuevaInfo.descripcion
      }
      //Si se desea cambiar el anunciante
      if (typeof nuevaInfo.anunciante !== "undefined") {
        mascota.anunciante = nuevaInfo.anunciante
      }
      //Si se desea cambiar el ubicacion
      if (typeof nuevaInfo.ubicacion !== "undefined") {
        mascota.ubicacion = nuevaInfo.ubicacion
      }
      //se guarda el registro actualizado
      mascota.save()
        .then(
          //se manda a la BD en forma de JSON
          updated => res.status(200).json(update.publicData())
        )
        .catch(next);

    })
    .catch(next);
}

function eliminarMascota(req, res, next) {
  //se usa una funcion definida de mongooose
  Mascota.findOneAndDelete({_id:req.params.id})
  .then(r=>res.status(200).send("Mascota eliminada"))
  .catch(next);
}


function count(req,res,next) {
  var categoria = req.params.cat
  Mascota.aggregate([
    {'$match': { 'categoria': categoria}}, 
    {'$count': 'total'}
  ]).then(r => {
    res.status(200).send(r)
  }).catch(next)
}

// exportamos las funciones definidas
module.exports = {
  crearMascota,
  obtenerMascotas,
  modificarMascota,
  eliminarMascota,
  count
}
