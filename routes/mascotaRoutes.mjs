import express from "express";
import {
  crearMascotaController,
  obtenerMascotasPublicasController,
  obtenerMascotasDeRefugioController,
  obtenerMascotaPorIdController,
  actualizarMascotaController,
  eliminarMascotaController,
  adoptarMascotaController,
} from "../controllers/mascotaController.mjs";
import { verificarToken } from "../middleware/authMiddleware.mjs";
import { verificarRol } from "../middleware/roleMiddleware.mjs";

const router = express.Router();

// Ruta pública para obtener mascotas con filtros y paginado (usuarios y adoptantes)
router.get("/", obtenerMascotasPublicasController);

// Obtener todas las mascotas del refugio logueado
router.get("/mascotas-refugio", verificarToken, obtenerMascotasDeRefugioController);

// Obtener una sola mascota (para ver detalle)
router.get("/mascota/:id", verificarToken, obtenerMascotaPorIdController);

// Crear nueva mascota (solo refugio)
router.post("/crear-mascota", verificarToken, verificarRol("refugio"), crearMascotaController);

// Actualizar mascota (solo refugio si lo restringís más adelante)
router.put("/actualizar-mascota/:id", verificarToken, verificarRol("refugio"), actualizarMascotaController);

// Eliminar mascota
router.delete("/eliminar-mascota/:id", verificarToken, verificarRol("refugio"), eliminarMascotaController);

// Adoptar mascota (adoptante)
router.put("/adoptar/:id", verificarToken, verificarRol("adoptante"), adoptarMascotaController);

export default router;

