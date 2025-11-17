import { ref } from "vue";
import { defineStore } from "pinia";
import router from "../../../Router";
import axios from "axios";
import Swal from "sweetalert2";
export const useLoginStore = defineStore("login", () => {
  const rol = ref(localStorage.getItem("rol_id") || "");
  const usuario = ref({});
  const verContraseña = ref(false);
  const credenciales = ref({
    usuario: "",
    contrasena: "",
  });
  const registro = ref({
    id_empleado: "",
    usuario: "",
    contrasena: "",
    rol: "",
  });

  function mostrarContraseña() {
    verContraseña.value = !verContraseña.value;
  }

  const rutas = [
    { rol: "Administrador", ruta: "admin" },
    { rol: "Cajero", ruta: "pos" },
    { rol: "Chef", ruta: "pedidos" },
    { rol: "Almacenista", ruta: "admin" },
  ];

  async function submit() {
    const response = await axios.post("/login", {
      nombre: credenciales.value.usuario,
      password: credenciales.value.contrasena,
    });
    if (response.data.success === false) {
      Swal.fire({
        icon: "warning",
        title: "Credenciales Incorrectas",
        text: response.data.message,
      });
    } else {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user.id);
      localStorage.setItem("rol_id", response.data.user.id_rol);
      rol.value = response.data.user.id_rol;
      usuario.value = response.data.user;

      router.push({ name: rutas[usuario.value.id_rol - 1].ruta });
    }
  }

  function asignarRegistro(item) {
    console.log(item);
    registro.value = item;
    console.log(registro.value);
  }

  function registrarUsuario() {
    if (!verificarRegistro()) {
      return;
    }
    try {
      const response = axios.post("/save-user", registro.value);
      Swal.fire({
        icon: "success",
        title: "Usuario Registrado",
        text: "El usuario ha sido registrado exitosamente.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar usuario",
        text: "Ha ocurrido un error al registrar el usuario. Por favor, inténtelo de nuevo.",
      });
    }
  }
  function verificarRegistro() {
    let flag = true;
    if (registro.value.id_empleado == "" || registro.value.usuario == "") {
      flag = false;
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos obligatorios.",
      });
    }
    return flag;
  }

  return {
    verContraseña,
    mostrarContraseña,
    credenciales,
    registro,
    submit,
    usuario,
    rol,
    asignarRegistro,
    registrarUsuario,
  };
});
