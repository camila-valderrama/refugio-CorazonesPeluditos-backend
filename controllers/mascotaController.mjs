import {
    crearMascota,
    obtenerMascotas,
    obtenerMascotaPorId,
    actualizarMascota,
    eliminarMascota,
    adoptarMascota,
  } from "../services/mascotaService.mjs";

import Refugio from "../models/Refugio.mjs";
  
  export async function crearMascotaController(req, res) {
    try {
      // Verificar que el usuario tenga rol 'refugio'
      if (req.usuario.rol !== "refugio") {
        return res.status(403).send({ mensaje: "Solo los refugios pueden crear mascotas" });
      }
  
      // Buscar el refugio vinculado al usuario logueado
      const refugio = await Refugio.findOne({ usuario: req.usuario.id });
      if (!refugio) {
        return res.status(404).send({ mensaje: "Refugio no encontrado para este usuario" });
      }
  
      // Crear la mascota asociándola al refugio
      const nuevaMascota = await crearMascota({
        ...req.body,
        refugio: refugio._id,
      });
  
      res.status(201).send(nuevaMascota);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al crear mascota", error });
    }
  }
  
  export async function obtenerMascotasController(req, res) {
    try {
      const { refugio } = req.query;
      let filtro = {};
  
      // Si viene por query param, usarlo
      if (refugio) {
        filtro.refugio = refugio;
      }
  
      // Si el usuario logueado es un refugio, solo mostrar sus mascotas
      if (req.usuario.rol === "refugio") {
        const refugioPropio = await Refugio.findOne({ usuario: req.usuario.id });
        if (refugioPropio) {
          filtro.refugio = refugioPropio._id;
        }
      }
  
      const lista = await obtenerMascotas(filtro);
      res.send(lista);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al obtener mascotas", error });
    }
  }
  
  
  export async function obtenerMascotaPorIdController(req, res) {
    try {
      const mascota = await obtenerMascotaPorId(req.params.id);
      if (!mascota) return res.status(404).send({ mensaje: "Mascota no encontrada" });
      res.send(mascota);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al buscar mascota", error });
    }
  }
  
  export async function actualizarMascotaController(req, res) {
    try {
      const mascota = await actualizarMascota(req.params.id, req.body);
      res.send(mascota);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al actualizar mascota", error });
    }
  }
  
  export async function eliminarMascotaController(req, res) {
    try {
      const mascota = await eliminarMascota(req.params.id);
      res.send(mascota);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al eliminar mascota", error });
    }
  }

  export async function adoptarMascotaController(req, res) {
    try {
      if (req.usuario.rol !== "usuario") {
        return res.status(403).send({ mensaje: "Solo los usuarios pueden adoptar mascotas" });
      }
  
      const mascota = await adoptarMascota(req.params.id, req.usuario.id);
      res.send({ mensaje: "Mascota adoptada con éxito", mascota });
    } catch (error) {
      res.status(400).send({ mensaje: error.message || "Error al adoptar mascota" });
    }
  }

  