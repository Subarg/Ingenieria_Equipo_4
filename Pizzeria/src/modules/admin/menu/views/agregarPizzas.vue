<template>
  <div
    v-if="mostrarModal"
    class="absolute top-0 left-0 w-full flex justify-center items-start z-50 mt-6"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Registrar Empleado
      </h2>

      <form @submit.prevent="guardarPizza" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            v-model="pizza.nombre"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Costo</label>
          <input
            v-model.number="pizza.costo"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="border border-gray-300 rounded-lg p-4 mt-4">
          <h3 class="text-lg font-semibold text-gray-800 mb-4 text-center">
            Receta
          </h3>

          <div
            class="flex items-center gap-2 mb-3"
            v-for="(insumo, index) in pizza.receta"
          >
            <select
              class="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="insumo.insumo"
            >
              <option value="">-- Selecciona un producto --</option>
              <option value="queso">Queso</option>
              <option value="harina">Harina</option>
              <option value="salsa">Salsa</option>
            </select>

            <input
              type="number"
              placeholder="Cantidad"
              class="w-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              v-model="insumo.cantidad"
            />

            <div
              class="flex items-center justify-center"
              v-if="pizza.receta.length > 1"
            >
              <button
                type="button"
                class="h-8 w-8 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                @click="eliminarInsumo(index)"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'trash-can']"
                  class="text-white-600 text-lg"
                />
              </button>
            </div>
          </div>

          <div class="flex justify-end mt-3">
            <button
              type="button"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              @click="agregarInsumo"
            >
              Agregar Insumo
            </button>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            @click="cerrarModal"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { usePizzasStore } from "../store/pizzas";

const { pizza, mostrarModal } = storeToRefs(usePizzasStore());
const { cerrarModal, guardarPizza, agregarInsumo, eliminarInsumo } =
  usePizzasStore();
</script>
