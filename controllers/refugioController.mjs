import {
    crearRefugio,
    obtenerRefugios,
    obtenerRefugioPorId,
    actualizarRefugio,
    eliminarRefugio
  } from "../services/refugioService.mjs";
  
  export async function crearRefugioController(req, res) {
    try {
      const datos = { ...req.body, usuario: req.usuario.id }; // Relacionado al usuario que lo crea
      const nuevo = await crearRefugio(datos);
      res.status(201).send(nuevo);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al crear refugio", error });
    }
  }
  
  export async function obtenerRefugiosController(req, res) {
    try {
      const lista = await obtenerRefugios();
      res.send(lista);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al obtener refugios", error });
    }
  }
  
  export async function obtenerRefugioPorIdController(req, res) {
    try {
      const refugio = await obtenerRefugioPorId(req.params.id);
      if (!refugio) return res.status(404).send({ mensaje: "Refugio no encontrado" });
      res.send(refugio);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al buscar refugio", error });
    }
  }
  
  export async function actualizarRefugioController(req, res) {
    try {
      const refugio = await actualizarRefugio(req.params.id, req.body);
      res.send(refugio);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al actualizar refugio", error });
    }
  }
  
  export async function eliminarRefugioController(req, res) {
    try {
      const refugio = await eliminarRefugio(req.params.id);
      res.send(refugio);
    } catch (error) {
      res.status(500).send({ mensaje: "Error al eliminar refugio", error });
    }
  }
  