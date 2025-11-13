import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { inject } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export const useCajeroStore = defineStore("cajeroStore", () => {
  const modalTurno = ref(false);
  const turno = ref({
    id_user: localStorage.getItem("user_id") || 0,
    numTurno: 0,
    caja: 0,
    fondoIncial: 0,
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
  const cajas = ref([]);

  const obtenerCajas = async () => {
    try {
      const response = await axios.get("/get-cajas");
      cajas.value = response.data.cajas;
    } catch (error) {
      console.error("Error al obtener las cajas:", error);
      return [];
    }
  };
  obtenerCajas();

  const obtenerUltimoTurno = async () => {
    try {
      const response = await axios.get("/get-ultimo-turno");
      turno.value.numTurno = response.data.ultimo_turno.id_turno + 1;
      console.log(turno.value.numTurno);
    } catch (error) {
      console.error("Error al obtener el último turno:", error);
    }
  };
  obtenerUltimoTurno();

  const registrarTurno = async () => {
    try {
      const ahora = new Date();

      turno.value.fecha = ahora.toISOString().split("T")[0]; // "YYYY-MM-DD"
      turno.value.hora_inicio = ahora.toTimeString().split(" ")[0]; // "HH:MM:SS"

      const response = await axios.post("/crear-turno", turno.value);
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Turno Iniciado",
        text: `Turno número ${turno.value.numTurno} iniciado con éxito.`,
      });
      cerrarModalTurno();
    } catch (error) {
      console.error("Error al registrar el turno:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo iniciar el turno. Inténtalo de nuevo.",
      });
    }
  };
  return {
    mostrarModalTurno,
    turno,
    modalTurno,
    cerrarModalTurno,
    cajas,
    registrarTurno,
  };
});
