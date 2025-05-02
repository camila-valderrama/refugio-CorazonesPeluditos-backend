import Usuario from "../models/Usuario.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registro de usuario
export async function registrarUsuario(nombre, email, password) {
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    throw { mensaje: "El correo ya está registrado", codigo: 400 };
  }

  const hash = await bcrypt.hash(password, 10);
  const nuevoUsuario = new Usuario({ nombre, email, password: hash });
  await nuevoUsuario.save();

  return { mensaje: "Usuario registrado correctamente" };
}

// Login de usuario
export async function loginUsuario(email, password) {
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    throw { mensaje: "Usuario no encontrado", codigo: 404 };
  }

  const coincide = await bcrypt.compare(password, usuario.password);
  if (!coincide) {
    throw { mensaje: "Contraseña incorrecta", codigo: 401 };
  }

  const token = jwt.sign(
    { id: usuario._id, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    mensaje: "Inicio de sesión exitoso",
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      rol: usuario.rol,
    },
  };
}
