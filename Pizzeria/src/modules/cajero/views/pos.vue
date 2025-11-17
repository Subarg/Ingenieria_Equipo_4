<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Bienvenido, Cajero</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Botón Iniciar Turno -->
      <div
        class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center"
      >
        <h2 class="text-xl font-semibold mb-4 text-center">Iniciar Turno</h2>
        <button
          class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          @click="mostrarModalTurno"
        >
          <FontAwesomeIcon
            :icon="['fas', 'calendar-check']"
            class="text-white text-xl"
          />
          Iniciar Turno
        </button>
      </div>

      <!-- Botón Iniciar Venta -->
      <div
        class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center"
      >
        <h2 class="text-xl font-semibold mb-4 text-center">Iniciar Venta</h2>
        <router-link to="/punto-venta">
          <button
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FontAwesomeIcon
              :icon="['fas', 'cart-shopping']"
              class="text-white text-xl"
            />
            Iniciar Venta
          </button>
        </router-link>
      </div>

      <!-- Botón Corte de Caja -->
      <div
        class="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center"
      >
        <h2 class="text-xl font-semibold mb-4 text-center">Corte de Caja</h2>
        <RouterLink to="/corte-caja">
          <button
            class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FontAwesomeIcon
              :icon="['fas', 'money-check-dollar']"
              class="text-white text-xl"
            />
            Corte de Caja
          </button>
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- Renderiza el modal -->
  <Turno />
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useCajeroStore } from "../store/cajero.js";
import Turno from "./turno.vue";

// Instancia del store
const cajeroStore = useCajeroStore();

// Destructura la función que necesitas
const { mostrarModalTurno } = cajeroStore;
</script>