import express from "express";
import {
  crearMascotaController,
  obtenerMascotasPublicasController,
  obtenerMascotasDeRefugioController,
  obtenerMascotaPorIdController,
  actualizarMascotaController,
  eliminarMascotaController,
  adoptarMascotaController,
} from "../controllers/mascotaController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ruta pública para obtener mascotas con filtros y paginado (usuarios y adoptantes)
router.get("/", obtenerMascotasPublicasController);

// Obtener todas las mascotas del refugio logueado
router.get("/mascotas-refugio", verificarToken, obtenerMascotasDeRefugioController);

// Obtener una sola mascota (para ver detalle)
router.get("/mascota/:id", verificarToken, obtenerMascotaPorIdController);

// Crear nueva mascota (solo refugio)
router.post("/crear-mascota", verificarToken, crearMascotaController);

// Actualizar mascota
router.put("/actualizar-mascota/:id", verificarToken, actualizarMascotaController);

// Eliminar mascota
router.delete("/eliminar-mascota/:id", verificarToken, eliminarMascotaController);

// Adoptar mascota (adoptante)
router.put("/adoptar/:id", verificarToken, adoptarMascotaController);

export default router;

