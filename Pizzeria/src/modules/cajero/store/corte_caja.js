import { defineStore } from "pinia";
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const useCorteCajaStore = defineStore("CorteCaja", () => {
  // --- STATE ---
  const fondoInicial = ref(0);
  const efectivoEnCaja = ref(0);
  const corteRealizado = ref(false);

  // Datos de ventas (estos deberían venir del backend en una implementación real)
  const ventasEnEfectivo = ref(1550.5);
  const ventasConTarjeta = ref(850.0);

  // --- GETTERS ---
  const ventasTotales = computed(
    () => ventasEnEfectivo.value + ventasConTarjeta.value
  );

  const dineroEsperadoEnCaja = computed(() => {
    // El dinero esperado es el fondo inicial más las ventas en efectivo
    return fondoInicial.value + ventasEnEfectivo.value;
  });

  const diferencia = computed(() => {
    // Diferencia entre lo contado y lo esperado
    return efectivoEnCaja.value - dineroEsperadoEnCaja.value;
  });

  // --- ACTIONS ---
  function realizarCorte() {
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
    
    // Aquí se podría guardar el corte en la base de datos
    console.log("Corte realizado:", {
      fondoInicial: fondoInicial.value,
      efectivoEnCaja: efectivoEnCaja.value,
      ventasEnEfectivo: ventasEnEfectivo.value,
      ventasConTarjeta: ventasConTarjeta.value,
      diferencia: diferencia.value,
    });
  }

  function nuevoCorte() {
    // Reseteamos los valores
    fondoInicial.value = 0;
    efectivoEnCaja.value = 0;
    corteRealizado.value = false;
    
    // En una implementación real, también resetearíamos las ventas
    // o las obtendríamos del nuevo turno
  }

  return {
    // State
    fondoInicial,
    efectivoEnCaja,
    corteRealizado,
    ventasEnEfectivo,
    ventasConTarjeta,
    
    // Getters
    ventasTotales,
    dineroEsperadoEnCaja,
    diferencia,
    
    // Actions
    realizarCorte,
    nuevoCorte,
  };
});