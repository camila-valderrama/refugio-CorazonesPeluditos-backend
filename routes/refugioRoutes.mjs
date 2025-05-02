import express from "express";
import {
  crearRefugioController,
  obtenerRefugiosController,
  obtenerRefugioPorIdController,
  actualizarRefugioController,
  eliminarRefugioController
} from "../controllers/refugioController.mjs";
import { verificarToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", obtenerRefugiosController);
router.get("/:id", obtenerRefugioPorIdController);
router.post("/", verificarToken, crearRefugioController);
router.put("/:id", verificarToken, actualizarRefugioController);
router.delete("/:id", verificarToken, eliminarRefugioController);

export default router;
