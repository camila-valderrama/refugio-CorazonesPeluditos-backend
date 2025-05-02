import express from "express";
import {
  crearRefugioController,
  obtenerRefugiosController,
  obtenerRefugioPorIdController,
  actualizarRefugioController,
  eliminarRefugioController
} from "../controllers/refugioController.mjs";
import { verificarToken } from "../middleware/authMiddleware.mjs";
import { verificarRol } from "../middleware/roleMiddleware.mjs";

const router = express.Router();

router.get("/", obtenerRefugiosController);
router.get("/refugio/:id", obtenerRefugioPorIdController);
router.post("/crear-refugio", verificarToken, verificarRol("refugio"), crearRefugioController);
router.put("/actualizar-refugio/:id", verificarToken, verificarRol("refugio"), actualizarRefugioController);
router.delete("/eliminar-refugio/:id", verificarToken, verificarRol("refugio"), eliminarRefugioController);

export default router;
