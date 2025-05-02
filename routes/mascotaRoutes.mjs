import express from "express";
import {
  crearMascotaController,
  obtenerMascotasController,
  obtenerMascotaPorIdController,
  actualizarMascotaController,
  eliminarMascotaController,
  adoptarMascotaController,
} from "../controllers/mascotaController.mjs";
import { verificarToken } from "../middleware/authMiddleware.mjs";

const router = express.Router();

router.get("/", verificarToken, obtenerMascotasController);
router.get("/:id", verificarToken, obtenerMascotaPorIdController);
router.post("/", verificarToken, crearMascotaController);
router.put("/:id", verificarToken, actualizarMascotaController);
router.put("/:id/adoptar", verificarToken, adoptarMascotaController);
router.delete("/:id", verificarToken, eliminarMascotaController);

export default router;
