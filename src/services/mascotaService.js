import Mascota from "../models/Mascota.js";

// Crear nueva mascota (solo refugios)
export async function crearMascota(datos) {
  return await Mascota.create(datos);
}

// Obtener una sola mascota por ID
export async function obtenerMascotaPorId(id) {
  return await Mascota.findById(id).populate("refugio", "nombre");
}

// Obtener mascotas del refugio logueado
export async function obtenerMascotasDeRefugio(idRefugio) {
  return await Mascota.find({ refugio: idRefugio }).populate("refugio", "nombre");
}

// Obtener mascotas públicas disponibles para adopción (adoptantes)
export async function obtenerMascotasPublicas(filtro = {}, page = 1, limit = 6) {
  const skip = (page - 1) * limit;
  const filtroFinal = { ...filtro, adoptada: false }; // Mostrar solo no adoptadas

  const mascotas = await Mascota.find(filtroFinal)
    .populate("refugio", "nombre")
    .skip(skip)
    .limit(Number(limit));

  return mascotas;
}

// Contar cuántas coinciden con los filtros públicos
export async function contarMascotasPublicas(filtro = {}) {
  const filtroFinal = { ...filtro, adoptada: false };
  return await Mascota.countDocuments(filtroFinal);
}

// Actualizar mascota
export async function actualizarMascota(id, datos) {
  return await Mascota.findByIdAndUpdate(id, datos, { new: true });
}

// Eliminar mascota
export async function eliminarMascota(id) {
  return await Mascota.findByIdAndDelete(id);
}

// Marcar mascota como adoptada
export async function adoptarMascota(idMascota, idUsuario) {
  return await Mascota.findByIdAndUpdate(
    idMascota,
    {
      adoptada: true,
      adoptante: idUsuario,
    },
    { new: true }
  );
}
