import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { inject } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export const useCajeroStore = defineStore("cajeroStore", () => {
  const modalTurno = ref(false);
  const turno = ref({
    numTurno: 0,
    caja: 0,
    fondoIncial: 0,
    cajero: 0,
  });
  function mostrarModalTurno() {
    modalTurno.value = true;
  }
  function cerrarModalTurno() {
    limpiarModalTurno();
    modalTurno.value = false;
  }

  function limpiarModalTurno() {
    turno.value = {
      numTurno: 0,
      caja: 0,
      fondoIncial: 0,
      cajero: 0,
    };
  }
  return {
    mostrarModalTurno,
    turno,
    modalTurno,
    cerrarModalTurno,
  };
});
