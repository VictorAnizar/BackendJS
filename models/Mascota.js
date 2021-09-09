// class Mascota{
//     constructor(id, nombre, categoria, foto, descripcion, anunciante, ubicacion){
//         this.id=id;
//         this.nombre=nombre;
//         this.categoria=categoria;
//         this.foto=foto;
//         this.descripcion=descripcion;
//         this.anunciante=anunciante;
//         this.ubicacion=ubicacion;
//     }
// }
// //vamos a exportar la definicion completa de la clase mascota
// module.exports=Mascota;

//jalamos mongoose
const mongoose = require('mongoose');
//generamos un esquema, por cada modelo se define un esquema. 
//Recibe 2 objetos: el primero es un objeto qcon todos los campos para crear un usuario
//el segundo parametro es un objeto de config con dos params: la coleccion de la BD y timestamp(guarda los logs)
const MascotaScheme = new mongoose.Schema({
    //nombre va a ser de tipo cadena y va a ser un atributo requerido
    nombre: { type: String, required: true },
    //Categoria de tipo string pero solo va a tener ciertos valores
    categoria: { type: String, enum: ['Perro', 'Gato', 'Otro'] },
    foto: String,
    descripcion: { type: String, required: true },
    //El anunciante va a ser de tipo id para que se fuerce que cada que se cree una mascota, se referncíe a un anunciante.
    //Es una referencia a los usuarios
    anunciante: {type: mongoose.Schema.Types.ObjectId, ref: "Usuario"},
    ubicacion: String
}, { collection: "Mascotas", timestamps: true });

//se necesita una funcion para indicar cuáles atributos son publicos y, por lo tanto, son accesibles para todos los usuarios
//Siempre que se defina un esquema se tiene que definir este metodo "public data"
MascotaScheme.methods.publicData = () => {
    return {
        id: this.id,
        nombre: this.nombre,
        categoria: this.categoria,
        foto: this.foto,
        descripcion: this.descripcion,
        anunciante: this.anunciante,
        ubicacion: this.ubicacion
    }
}
//Los attr anteriores son accesibles para todos. "Password" no es accesible para todo el mundo
//cada que en JS hablemos de "Usuario", nos referimos al esquema
mongoose.model("Mascota", MascotaScheme);