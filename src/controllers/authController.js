import { registrarUsuario, loginUsuario } from '../services/authService.js';

// Controlador para registrar un nuevo usuario
export async function registrarUsuarioController(req, res) {
  try {
    const { nombre, email, password, rol } = req.body;
    const respuesta = await registrarUsuario(nombre, email, password, rol);
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


