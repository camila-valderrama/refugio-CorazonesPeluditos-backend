import mongoose from "mongoose";

const refugioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String },
  contacto: { type: String },
  descripcion: { type: String },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }
}, { timestamps: true });

export default mongoose.model("Refugio", refugioSchema);
