import { ref } from "vue";
import { defineStore } from "pinia";
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

  function submit() {
    router.push({ name: "admin" });
  }
  return {
    verContraseña,
    mostrarContraseña,
    credenciales,
    registro,
    submit,
  };
});
