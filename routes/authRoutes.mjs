import express from "express";
import {
  registrarUsuarioController,
  loginUsuarioController
} from "../controllers/authController.mjs";
import { verificarToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

// Rutas públicas
router.post("/register", registrarUsuarioController);
router.post("/login", loginUsuarioController);

// Ruta protegida para obtener perfil del usuario logueado
router.get("/profile", verificarToken, (req, res) => {
  res.send({
    mensaje: "Perfil obtenido correctamente",
    usuario: req.usuario,
  });
});

export default router;
