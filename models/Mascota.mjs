import mongoose from "mongoose";

const mascotaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especie: { type: String, required: true },
  raza: { type: String },
  edad: { type: Number, required: true },
  descripcion: { type: String },
  imagen: { type: String },
  refugio: { type: mongoose.Schema.Types.ObjectId, ref: "Refugio", required: true },
  adoptada: { type: Boolean, default: false },
  adoptante: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", default: null }
}, { timestamps: true });

export default mongoose.model("Mascota", mascotaSchema);
