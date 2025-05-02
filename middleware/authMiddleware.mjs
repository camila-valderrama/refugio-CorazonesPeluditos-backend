import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ mensaje: "Token requerido" });

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};