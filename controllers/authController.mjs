import { registrarUsuario, loginUsuario } from '../services/authService.mjs';

// Controlador para registrar un nuevo usuario
export async function registrarUsuarioController(req, res) {
  try {
    const { nombre, email, password } = req.body;
    const respuesta = await registrarUsuario(nombre, email, password);
    res.status(201).send(respuesta);
  } catch (error) {
    res.status(error.codigo || 500).send({ mensaje: error.mensaje || "Error al registrar usuario" });
  }
}

// Controlador para login
export async function loginUsuarioController(req, res) {
  try {
    const { email, password } = req.body;
    const respuesta = await loginUsuario(email, password);
    res.send(respuesta);
  } catch (error) {
    res.status(error.codigo || 500).send({ mensaje: error.mensaje || "Error al iniciar sesión" });
  }
}
