import { defineStore } from "pinia";
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import axios from "axios";

export const useCorteCajaStore = defineStore("CorteCaja", () => {
  // --- STATE ---
  const fondoInicial = ref(0);
  const efectivoEnCaja = ref(0);
  const corteRealizado = ref(false);

  const ventas = ref({
    efectivo: 0,
    tarjeta: 0,
    transferencia: 0,
    total: 0,
  });

  // --- GETTERS ---
  const ventasEnEfectivo = computed(() => ventas.value.efectivo);

  const dineroEsperadoEnCaja = computed(() => {
    return fondoInicial.value + ventasEnEfectivo.value;
  });

  const diferencia = computed(() => {
    return efectivoEnCaja.value - dineroEsperadoEnCaja.value;
  });

  // --- ACTIONS ---
  function realizarCorte() {
    let turno = JSON.parse(localStorage.getItem("turnoActivo") || "{}");

    fondoInicial.value = turno.fondoIncial || 0;

    if (fondoInicial.value <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Fondo inicial requerido",
        text: "El fondo inicial debe ser mayor a cero.",
      });
      return;
    }

    if (efectivoEnCaja.value <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Efectivo en caja requerido",
        text: "Ingresa el efectivo contado en caja.",
      });
      return;
    }

    corteRealizado.value = true;
  }

  async function nuevoCorte() {
    let flag = false;
    try {
      const turno = JSON.parse(localStorage.getItem("turnoActivo") || "{}");
      const id_usuario = parseInt(localStorage.getItem("user_id")) || 0;
      await axios.post("crear-corte-caja", {
        id_turno: turno.numTurno,
        id_usuario: id_usuario,
        fecha: new Date().toISOString().split("T")[0],
        fondo_inicial: fondoInicial.value,
        fondo_final: efectivoEnCaja.value,
      });

      Swal.fire({
        icon: "success",
        title: "Corte creado",
        text: "El corte de caja se registró correctamente.",
      });
      fondoInicial.value = 0;
      efectivoEnCaja.value = 0;
      ventas.value = { efectivo: 0, tarjeta: 0, transferencia: 0, total: 0 };
      corteRealizado.value = false;
      flag = true;
      return flag;
    } catch (error) {
      console.error("Error al crear el corte:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el corte.",
      });
      return flag;
    }
  }

  async function obtenerVentasDelTurno() {
    try {
      const id_turno = JSON.parse(localStorage.getItem("turnoActivo")).numTurno;

      const response = await axios.post("get-ventas-turno", { id_turno });

      const data = response.data; // tu arreglo [{...}, {...}]

      let efectivo = 0,
        tarjeta = 0,
        transferencia = 0;

      data.forEach((item) => {
        let monto = parseFloat(item.total_por_metodo);

        if (item.metodo_pago === "efectivo") efectivo = monto;
        if (item.metodo_pago === "tarjeta") tarjeta = monto;
        if (item.metodo_pago === "transferencia") transferencia = monto;
      });

      ventas.value = {
        efectivo,
        tarjeta,
        transferencia,
        total: efectivo + tarjeta + transferencia,
      };
    } catch (error) {
      console.error("Error al obtener ventas:", error);
    }
  }

  return {
    // state
    fondoInicial,
    efectivoEnCaja,
    corteRealizado,
    ventas,

    // getters
    dineroEsperadoEnCaja,
    diferencia,

    // actions
    realizarCorte,
    nuevoCorte,
    obtenerVentasDelTurno,
  };
});
