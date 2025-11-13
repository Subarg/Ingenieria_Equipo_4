<template>
  <div
    v-if="modalTurno"
    class="absolute top-0 left-0 w-full flex justify-center items-start z-50 mt-6"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Iniciar Turno
      </h2>

      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">
            Número de turno
          </label>
          <input
            type="number"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej. 1"
            :disabled="true"
            v-model="turno.numTurno"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Caja</label>
          <select
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="asignarCaja($event.target.value)"
          >
            <option value="">-- Selecciona una caja --</option>
            <option
              v-for="(caja, index) in cajas"
              :value="index + 1"
              :key="caja.id"
            >
              Caja {{ caja.numero }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">
            Fondo inicial de caja
          </label>
          <input
            type="number"
            step="0.01"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="$0.00"
            v-model="turno.fondoIncial"
          />
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            @click="cerrarModalTurno"
          >
            Cancelar
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            @click="registrarTurno()"
          >
            Iniciar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useCajeroStore } from "../store/cajero";

const { turno, modalTurno, cajas } = storeToRefs(useCajeroStore());
const { cerrarModalTurno, registrarTurno } = useCajeroStore();

function asignarCaja(caja) {
  console.log("Caja seleccionada:", caja);
  turno.value.caja = caja;
}
</script>
