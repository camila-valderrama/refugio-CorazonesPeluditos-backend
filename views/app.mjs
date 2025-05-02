import express from 'express';
import { connectDB } from '../config/dbConfig.mjs';
import authRoutes from '../routes/authRoutes.mjs';
import mascotaRoutes from '../routes/mascotaRoutes.mjs';
import refugioRoutes from '../routes/refugioRoutes.mjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Simular __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, '..', 'public')));

// Motor de vistas (si lo vas a usar con EJS)
app.set('views', join(__dirname));
app.set('view engine', 'ejs');

// Conexión a MongoDB
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/refugios', refugioRoutes);

// Manejo de rutas no existentes
app.use((req, res) => {
  res.status(404).send({ mensaje: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
