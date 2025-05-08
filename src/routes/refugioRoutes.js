import express from "express";
import {
  crearRefugioController,
  obtenerRefugiosController,
  obtenerRefugioPorIdController,
  actualizarRefugioController,
  eliminarRefugioController
} from "../controllers/refugioController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", obtenerRefugiosController);
router.get("/refugio/:id", obtenerRefugioPorIdController);
router.post("/crear-refugio", verificarToken, crearRefugioController);
router.put("/actualizar-refugio/:id", verificarToken, actualizarRefugioController);
router.delete("/eliminar-refugio/:id", verificarToken, eliminarRefugioController);

export default router;
