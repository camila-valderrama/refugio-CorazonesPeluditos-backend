import {
  crearMascota,
  obtenerMascotaPorId,
  obtenerMascotasDeRefugio,
  obtenerMascotasPublicas,
  contarMascotasPublicas,
  actualizarMascota,
  eliminarMascota,
  adoptarMascota,
} from "../services/mascotaService.js";

import Refugio from "../models/Refugio.js";

// Crear nueva mascota (solo refugio)
export async function crearMascotaController(req, res) {
  try {
    if (req.usuario.rol !== "refugio") {
      return res.status(403).send({ mensaje: "Solo los refugios pueden crear mascotas" });
    }

    const refugio = await Refugio.findOne({ usuario: req.usuario.id });
    if (!refugio) {
      return res.status(404).send({ mensaje: "Refugio no encontrado" });
    }

    const nuevaMascota = await crearMascota({
      ...req.body,
      refugio: refugio._id,
    });

    res.status(201).send(nuevaMascota);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al crear mascota", error });
  }
}

// Obtener mascotas públicas (usuarios/adoptantes)
export async function obtenerMascotasPublicasController(req, res) {
  try {
    const { especie, raza, page = 1, limit = 6 } = req.query;
    let filtro = {};

    if (especie) filtro.especie = new RegExp(especie, "i");
    if (raza) filtro.raza = new RegExp(raza, "i");

    const mascotas = await obtenerMascotasPublicas(filtro, page, limit);
    const total = await contarMascotasPublicas(filtro);

    res.send({
      mascotas,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener mascotas", error });
  }
}

// Obtener mascotas del refugio logueado
export async function obtenerMascotasDeRefugioController(req, res) {
  try {
    if (req.usuario.rol !== "refugio") {
      return res.status(403).send({ mensaje: "Acceso restringido a refugios" });
    }

    const refugio = await Refugio.findOne({ usuario: req.usuario.id });
    if (!refugio) {
      return res.status(404).send({ mensaje: "Refugio no encontrado" });
    }

    const mascotas = await obtenerMascotasDeRefugio(refugio._id);
    res.send(mascotas);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al obtener mascotas del refugio", error });
  }
}

// Obtener una mascota por ID
export async function obtenerMascotaPorIdController(req, res) {
  try {
    const mascota = await obtenerMascotaPorId(req.params.id);
    if (!mascota) return res.status(404).send({ mensaje: "Mascota no encontrada" });
    res.send(mascota);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al buscar mascota", error });
  }
}

// Actualizar mascota (puede ser solo refugio en el futuro)
export async function actualizarMascotaController(req, res) {
  try {
    const mascota = await actualizarMascota(req.params.id, req.body);
    res.send(mascota);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al actualizar mascota", error });
  }
}

// Eliminar mascota
export async function eliminarMascotaController(req, res) {
  try {
    const mascota = await eliminarMascota(req.params.id);
    res.send(mascota);
  } catch (error) {
    res.status(500).send({ mensaje: "Error al eliminar mascota", error });
  }
}

// Adoptar mascota (solo usuarios adoptantes)
export async function adoptarMascotaController(req, res) {
  try {
    const mascota = await obtenerMascotaPorId(req.params.id);
    if (!mascota) return res.status(404).send({ mensaje: "Mascota no encontrada" });
    if (mascota.adoptada) return res.status(400).send({ mensaje: "Ya fue adoptada" });

    const actualizada = await adoptarMascota(mascota._id, req.usuario.id);
    res.send({ mensaje: "Adoptada con éxito", mascota: actualizada });
  } catch (error) {
    res.status(400).send({ mensaje: error.message || "Error al adoptar" });
  }
}
