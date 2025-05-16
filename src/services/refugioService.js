import Refugio from "../models/Refugio.js";

export async function crearRefugio(datos) {
  const yaExiste = await Refugio.findOne({ usuario: datos.usuario });
  if (yaExiste) {
    throw new Error("El usuario ya tiene un refugio asignado");
  }
  return await Refugio.create(datos);
}

export async function obtenerRefugios() {
  return await Refugio.find().populate("usuario", "nombre email");
}

export async function obtenerRefugioPorId(id) {
  return await Refugio.findById(id).populate("usuario", "nombre");
}

export async function actualizarRefugio(id, datos) {
  return await Refugio.findByIdAndUpdate(id, datos, { new: true });
}

export async function eliminarRefugio(id) {
  return await Refugio.findByIdAndDelete(id);
}
