import jwt from "jsonwebtoken";

export default function generarToken(id, rol) {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}
