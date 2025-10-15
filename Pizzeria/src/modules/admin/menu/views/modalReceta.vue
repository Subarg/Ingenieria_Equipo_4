<template>
  <div
    v-if="mostrarModalReceta"
    class="absolute top-0 left-0 w-full flex justify-center items-start z-50 mt-6"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Receta
      </h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-gray-700">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="px-6 py-3 text-center font-semibold">Insumo</th>
              <th class="px-6 py-3 text-center font-semibold">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(insumo, index) in pizza.receta"
              :key="index"
              class="border-b hover:bg-gray-50"
            >
              <td class="px-6 py-3 text-center">{{ insumo.insumo }}</td>
              <td class="px-6 py-3 text-center">{{ insumo.cantidad }}</td>
            </tr>
            <tr v-if="pizza.receta.length === 0">
              <td colspan="2" class="text-center py-4 text-gray-500">
                No hay insumos en la receta
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end pt-4">
        <button
          type="button"
          class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          @click="mostrarModalReceta = false"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePizzasStore } from "../store/pizzas";

const { pizza, mostrarModalReceta } = storeToRefs(usePizzasStore());

usePizzasStore();
</script>
