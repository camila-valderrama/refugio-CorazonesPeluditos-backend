import express from 'express';
const router = express.Router();

//Importar todas las rutas
import authRoutes from './authRoutes.js';
import mascotaRoutes from './mascotaRoutes.js';
import refugioRoutes from './refugioRoutes.js';

//Combinar rutas
router.get('/', (req, res)=>{ res.status(200).json({'servidor': 'online'})});
router.use('/auth', authRoutes);
router.use('/mascotas', mascotaRoutes);
router.use('/refugios', refugioRoutes);

export default router;
