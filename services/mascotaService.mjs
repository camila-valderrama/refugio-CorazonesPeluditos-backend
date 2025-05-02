import Mascota from "../models/Mascota.mjs";

export async function crearMascota(datos) {
  return await Mascota.create(datos);
}

export async function obtenerMascotas(filtro = {}) {
  return await Mascota.find(filtro).populate("refugio", "nombre email");
}

export async function obtenerMascotaPorId(id) {
  return await Mascota.findById(id).populate("refugio", "nombre");
}

export async function actualizarMascota(id, datos) {
  return await Mascota.findByIdAndUpdate(id, datos, { new: true });
}

export async function eliminarMascota(id) {
  return await Mascota.findByIdAndDelete(id);
}

export async function adoptarMascota(idMascota, idUsuario) {
    const mascota = await Mascota.findById(idMascota);
  
    if (!mascota) throw new Error("Mascota no encontrada");
    if (mascota.adoptada) throw new Error("Mascota ya fue adoptada");
  
    mascota.adoptada = true;
    mascota.adoptante = idUsuario;
    await mascota.save();
  
    return mascota;
  }
  