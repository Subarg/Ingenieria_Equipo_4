<template>
  <div
    v-if="modalTurno"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="cerrarModalTurno"
  >
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-gray-800">Iniciar Turno</h2>
        <button
          @click="cerrarModalTurno"
          class="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <form @submit.prevent="registrarTurno">
        <!-- Número de Turno (solo lectura) -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            Número de Turno
          </label>
          <input
            type="text"
            v-model="turno.numTurno"
            class="w-full px-4 py-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            readonly
          />
        </div>

        <!-- Seleccionar Caja -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            Seleccionar Caja *
          </label>
          <select
            v-model="turno.caja"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option :value="0" disabled>-- Selecciona una caja --</option>
            <option
              v-for="caja in cajas"
              :key="caja.id_caja"
              :value="caja.id_caja"
            >
              {{ caja.nombre_caja }}
            </option>
          </select>
        </div>

        <!-- Fondo Inicial -->
        <div class="mb-4">
          <label class="block text-gray-700 font-semibold mb-2">
            Fondo Inicial *
          </label>
          <input
            type="number"
            v-model.number="turno.fondoIncial"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ej: 500.00"
            step="0.01"
            min="0"
            required
          />
        </div>

        <!-- Botones -->
        <div class="flex gap-3">
          <button
            type="button"
            @click="cerrarModalTurno"
            class="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Iniciar Turno
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCajeroStore } from "../store/cajero.js";

const cajeroStore = useCajeroStore();

// Referencias reactivas del store
const { modalTurno, turno, cajas } = storeToRefs(cajeroStore);

// Acciones del store
const { cerrarModalTurno, registrarTurno } = cajeroStore;
</script>