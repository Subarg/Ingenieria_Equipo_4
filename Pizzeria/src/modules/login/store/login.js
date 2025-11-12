import { ref } from "vue";
import { defineStore } from "pinia";
import router from "../../../Router";
import axios from "axios";

export const useLoginStore = defineStore("login", () => {
  const rol = ref(localStorage.getItem("rol_id") || "");
  const usuario = ref({});
  const verContraseña = ref(false);
  const credenciales = ref({
    usuario: "",
    contrasena: "",
  });
  const registro = ref({
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
    if (!response.data.success) {
      Swal.fire({
        icon: "warning",
        title: "Credenciales Incorrectas",
      });
    } else {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user.id);
      localStorage.setItem("rol_id", response.data.user.rol_id);
      rol.value = response.data.user.rol_id;
      usuario.value = response.data.user;
      router.push({ name: rutas[usuario.value.rol_id - 1].ruta });
    }
  }

  return {
    verContraseña,
    mostrarContraseña,
    credenciales,
    registro,
    submit,
    usuario,
    rol,
  };
});
