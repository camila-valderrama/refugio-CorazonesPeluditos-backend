import Refugio from "../models/Refugio.mjs";

export async function crearRefugio(datos) {
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
