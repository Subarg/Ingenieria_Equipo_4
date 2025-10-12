import { ref } from "vue";
import { defineStore } from "pinia";
import { inject } from "vue";
import axios from "axios";
export const useLoginStore = defineStore("login", () => {
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

  return {
    verContraseña,
    mostrarContraseña,
    credenciales,
    registro,
  };
});
