import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCorteCajaStore = defineStore('CorteCaja', () => {
    
    // --- STATE (Datos que el usuario ingresará) ---
    const fondoInicial = ref(0);
    const efectivoEnCaja = ref(0); // El dinero que el cajero cuenta físicamente
    const corteRealizado = ref(false); // Para saber si mostrar el formulario o el resultado

    // --- DATOS SIMULADOS (Esto vendrá de tu sistema de ventas después) ---
    const ventasEnEfectivo = ref(1550.50);
    const ventasConTarjeta = ref(850.00);

    // --- GETTERS (Datos que se calculan solos) ---
    const ventasTotales = computed(() => ventasEnEfectivo.value + ventasConTarjeta.value);
    
    const dineroEsperadoEnCaja = computed(() => {
        // El dinero que debería haber es el fondo inicial más solo las ventas en efectivo
        return fondoInicial.value + ventasEnEfectivo.value;
    });

    const diferencia = computed(() => {
        // Comparamos lo que contamos con lo que debería haber
        return efectivoEnCaja.value - dineroEsperadoEnCaja.value;
    });

    // --- ACTIONS (Funciones que podemos llamar) ---
    function realizarCorte() {
        if (fondoInicial.value > 0 && efectivoEnCaja.value > 0) {
            corteRealizado.value = true;
            // En un futuro, aquí se guardaría el corte en la base de datos
        } else {
            alert('Por favor, ingresa el fondo inicial y el efectivo contado.');
        }
    }

    function nuevoCorte() {
        // Reseteamos los valores para el siguiente turno
        fondoInicial.value = 0;
        efectivoEnCaja.value = 0;
        corteRealizado.value = false;
    }

    return {
        fondoInicial,
        efectivoEnCaja,
        corteRealizado,
        ventasEnEfectivo,
        ventasConTarjeta,
        ventasTotales,
        dineroEsperadoEnCaja,
        diferencia,
        realizarCorte,
        nuevoCorte,
    };
});