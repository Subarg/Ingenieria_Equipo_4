import { ref, computed } from "vue";
import { defineStore } from "pinia";
import apiClient from "../../../axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const useCajeroStore = defineStore("cajeroStore", () => {
  // --- STATE ---
  const modalTurno = ref(false);
  const turno = ref({
    id_user: parseInt(localStorage.getItem("user_id")) || 0,
    numTurno: 0,
    caja: 0,
    fondoIncial: 0,
    fecha: "",
    hora_inicio: "",
  });

  const cajas = ref([]);
  const turnoActivo = ref(false);

  // --- GETTERS ---
  const tieneTurnoActivo = computed(() => {
    return turno.value.numTurno > 0 && turnoActivo.value;
  });

  // --- ACTIONS ---
  function mostrarModalTurno() {
    modalTurno.value = true;
  }

  function cerrarModalTurno() {
    limpiarModalTurno();
    modalTurno.value = false;
  }

  function limpiarModalTurno() {
    turno.value = {
      id_user: parseInt(localStorage.getItem("user_id")) || 0,
      numTurno: 0,
      caja: 0,
      fondoIncial: 0,
      fecha: "",
      hora_inicio: "",
    };
  }

  const obtenerCajas = async () => {
    try {
      const response = await apiClient.get("/get-cajas");
      cajas.value = response.data.cajas || [];
      console.log("Cajas obtenidas:", cajas.value);
    } catch (error) {
      console.error("Error al obtener las cajas:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar las cajas disponibles.",
      });
    }
  };

  const obtenerUltimoTurno = async () => {
    try {
      const response = await apiClient.get("/get-ultimo-turno");
      const ultimoTurno = response.data.ultimo_turno;
      
      if (ultimoTurno && ultimoTurno.id_turno) {
        turno.value.numTurno = ultimoTurno.id_turno + 1;
      } else {
        turno.value.numTurno = 1; // Primer turno
      }
      
      console.log("Número de turno siguiente:", turno.value.numTurno);
    } catch (error) {
      console.error("Error al obtener el último turno:", error);
      turno.value.numTurno = 1; // Valor por defecto
    }
  };

  const registrarTurno = async () => {
    // Validaciones
    if (!turno.value.caja || turno.value.caja === 0) {
      Swal.fire({
        icon: "warning",
        title: "Caja no seleccionada",
        text: "Por favor, selecciona una caja antes de iniciar el turno.",
      });
      return;
    }

    if (!turno.value.fondoIncial || turno.value.fondoIncial <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Fondo inicial inválido",
        text: "Por favor, ingresa un fondo inicial válido.",
      });
      return;
    }

    try {
      const ahora = new Date();
      turno.value.fecha = ahora.toISOString().split("T")[0]; // "YYYY-MM-DD"
      turno.value.hora_inicio = ahora.toTimeString().split(" ")[0]; // "HH:MM:SS"
      turno.value.id_user = parseInt(localStorage.getItem("user_id")) || 0;

      console.log("Enviando turno:", turno.value);

      const response = await apiClient.post("/crear-turno", turno.value);
      
      console.log("Respuesta del servidor:", response.data);

      // CRÍTICO: Marcamos el turno como activo ANTES de cerrar el modal
      turnoActivo.value = true;
      
      // Guardamos el turno en localStorage para persistencia
      localStorage.setItem("turnoActivo", JSON.stringify({
        numTurno: turno.value.numTurno,
        caja: turno.value.caja,
        fondoIncial: turno.value.fondoIncial,
        fecha: turno.value.fecha,
        hora_inicio: turno.value.hora_inicio,
        id_user: turno.value.id_user
      }));

      Swal.fire({
        icon: "success",
        title: "Turno Iniciado",
        text: `Turno número ${turno.value.numTurno} iniciado con éxito.`,
        timer: 2000,
        showConfirmButton: false,
      });

      // NO llamamos a cerrarModalTurno() porque limpia el turno
      // Solo cerramos el modal
      modalTurno.value = false;
    } catch (error) {
      console.error("Error al registrar el turno:", error);
      console.error("Detalles del error:", error.response?.data);
      
      Swal.fire({
        icon: "error",
        title: "Error al iniciar turno",
        text: error.response?.data?.message || "No se pudo iniciar el turno. Verifica los datos e intenta de nuevo.",
      });
    }
  };

  const finalizarTurno = () => {
    turnoActivo.value = false;
    localStorage.removeItem("turnoActivo");
    limpiarModalTurno();
  };

  const cargarTurnoDeLocalStorage = () => {
    const turnoGuardado = localStorage.getItem("turnoActivo");
    if (turnoGuardado) {
      try {
        const turnoData = JSON.parse(turnoGuardado);
        turno.value = turnoData;
        turnoActivo.value = true;
        console.log("Turno cargado desde localStorage:", turnoData);
      } catch (error) {
        console.error("Error al parsear turno de localStorage:", error);
        localStorage.removeItem("turnoActivo");
      }
    }
  };

  // Inicialización
  cargarTurnoDeLocalStorage(); // Primero intentamos cargar un turno existente
  obtenerCajas();
  obtenerUltimoTurno();

  return {
    // State
    modalTurno,
    turno,
    cajas,
    turnoActivo,
    
    // Getters
    tieneTurnoActivo,
    
    // Actions
    mostrarModalTurno,
    cerrarModalTurno,
    registrarTurno,
    finalizarTurno,
    obtenerCajas,
    obtenerUltimoTurno,
    cargarTurnoDeLocalStorage,
  };
});