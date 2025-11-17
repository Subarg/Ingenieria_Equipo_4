<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center p-6">
    <div
      class="w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-lg text-white"
    >
      <button
        @click="volver"
        class="mb-4 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
      >
        <FontAwesomeIcon :icon="['fas', 'caret-left']" style="color: white" />
        Volver
      </button>

      <h1 class="text-3xl font-bold text-center mb-8">Corte de Caja</h1>

      <!-- Advertencia si no hay turno activo -->
      <div v-if="!cajeroStore.turnoActivo" class="bg-red-900 p-4 rounded-lg mb-6">
        <p class="text-center text-lg">
          ⚠️ No hay un turno activo. Por favor, inicia un turno antes de realizar el corte.
        </p>
      </div>

      <div v-if="!corteRealizado">
        <div class="space-y-6">
          <!-- Información del Cajero -->
          <div>
            <label class="block text-lg font-medium text-gray-300">
              Cajero
            </label>
            <input
              type="text"
              :value="nombreCajero"
              class="mt-2 bg-gray-700 text-white w-full py-3 px-4 rounded-lg text-lg focus:outline-none"
              disabled
            />
          </div>

          <!-- Número de Turno -->
          <div>
            <label class="block text-lg font-medium text-gray-300">
              Número de Turno
            </label>
            <input
              type="text"
              :value="cajeroStore.turno.numTurno"
              class="mt-2 bg-gray-700 text-white w-full py-3 px-4 rounded-lg text-lg focus:outline-none"
              disabled
            />
          </div>

          <!-- Fecha -->
          <div>
            <label class="block text-lg font-medium text-gray-300">
              Fecha
            </label>
            <input
              type="date"
              v-model="fecha"
              class="mt-2 bg-gray-700 text-white w-full py-3 px-4 rounded-lg text-lg focus:outline-none"
              disabled
            />
          </div>

          <!-- Fondo Inicial (del turno) -->
          <div>
            <label class="block text-lg font-medium text-gray-300">
              Fondo Inicial ($)
            </label>
            <input
              type="number"
              :value="cajeroStore.turno.fondoIncial"
              class="mt-2 bg-gray-700 text-white w-full py-3 px-4 rounded-lg text-lg focus:outline-none"
              disabled
            />
          </div>

          <!-- Efectivo Final Contado -->
          <div>
            <label
              for="efectivoFinal"
              class="block text-lg font-medium text-gray-300"
            >
              Efectivo Final Contado en Caja ($) *
            </label>
            <input
              type="number"
              v-model.number="efectivoEnCaja"
              id="efectivoFinal"
              class="mt-2 bg-gray-700 text-white w-full py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej: 2100.00"
              step="0.01"
              :disabled="!cajeroStore.turnoActivo"
            />
          </div>
        </div>

        <button
          @click="realizarCorteLocal"
          :disabled="!cajeroStore.turnoActivo"
          class="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Realizar Corte
        </button>
      </div>

      <div v-else class="space-y-4">
        <h2
          class="text-2xl font-semibold text-center border-b border-gray-600 pb-4"
        >
          Resumen del Turno
        </h2>

        <div
          class="flex justify-between text-xl font-bold py-3 border-b border-gray-600"
        >
          <span class="text-white">Ventas Totales:</span>
          <span>${{ ventasTotales.toFixed(2) }}</span>
        </div>

        <div class="pt-6 space-y-4">
          <div class="flex justify-between text-lg">
            <span class="text-gray-400">Dinero Esperado en Caja:</span>
            <span class="font-semibold"
              >${{ dineroEsperadoEnCaja.toFixed(2) }}</span
            >
          </div>
          <div class="flex justify-between text-lg">
            <span class="text-gray-400">Dinero Contado en Caja:</span>
            <span class="font-semibold">${{ efectivoEnCaja.toFixed(2) }}</span>
          </div>
          <div
            class="flex justify-between text-2xl font-bold p-4 rounded-lg"
            :class="
              diferencia === 0
                ? 'bg-gray-700'
                : diferencia > 0
                  ? 'bg-green-800'
                  : 'bg-red-800'
            "
          >
            <span
              >Diferencia ({{
                diferencia > 0 ? "Sobrante" : "Faltante"
              }}):</span
            >
            <span>${{ Math.abs(diferencia).toFixed(2) }}</span>
          </div>
        </div>

        <button
          @click="nuevoCorteLocal"
          class="w-full mt-8 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg text-lg transition-colors"
        >
          Finalizar Turno y Nuevo Corte
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCorteCajaStore } from "../store/corte_caja.js";
import { useCajeroStore } from "../store/cajero.js";
import { onMounted, ref, computed } from "vue";
import router from "../../../Router/index.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const corteStore = useCorteCajaStore();
const cajeroStore = useCajeroStore();

const fecha = ref("");
const nombreCajero = ref("Usuario"); // Puedes obtenerlo de localStorage o del backend

const { nuevoCorte } = storeToRefs(useCorteCajaStore());

const { nuevoCorte } = storeToRefs(useCorteCajaStore());

onMounted(() => {
  const hoy = new Date();
  const year = hoy.getFullYear();
  const month = String(hoy.getMonth() + 1).padStart(2, "0");
  const day = String(hoy.getDate()).padStart(2, "0");
  fecha.value = `${year}-${month}-${day}`;
  
  // Cargar nombre de usuario si está disponible
  const userName = localStorage.getItem("user_name");
  if (userName) {
    nombreCajero.value = userName;
  }
});

const {
  efectivoEnCaja,
  corteRealizado,
  ventasEnEfectivo,
  ventasConTarjeta,
  ventasTotales,
  dineroEsperadoEnCaja,
  diferencia,
} = storeToRefs(corteStore);

// Sincronizamos el fondo inicial del corte con el del turno
const fondoInicialTurno = computed(() => cajeroStore.turno.fondoIncial || 0);

function realizarCorteLocal() {
  // Actualizamos el fondo inicial del corte con el del turno
  corteStore.fondoInicial = fondoInicialTurno.value;
  corteStore.realizarCorte();
}

function nuevoCorteLocal() {
  corteStore.nuevoCorte();
  // También finalizamos el turno del cajero
  cajeroStore.finalizarTurno();
  router.push({ name: "pos" });
}

function volver() {
  router.push({ name: "pos" });
}
</script>