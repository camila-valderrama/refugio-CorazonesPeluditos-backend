import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import generarToken from "../utils/generarToken.js";

// Registro de usuario
export async function registrarUsuario(nombre, email, password, rol = "usuario") {
  const usuarioExistente = await Usuario.findOne({ email });
  if (usuarioExistente) {
    throw { mensaje: "El correo ya está registrado", codigo: 400 };
  }

  const hash = await bcrypt.hash(password, 10);
  const nuevoUsuario = new Usuario({ nombre, email, password: hash, rol });
  await nuevoUsuario.save();

  const token = generarToken(nuevoUsuario._id, nuevoUsuario.rol);

  return {
    mensaje: "Usuario registrado correctamente",
    token,
    usuario: {
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      rol: nuevoUsuario.rol,
    },
  };
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

  const token = generarToken(usuario._id, usuario.rol);

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
