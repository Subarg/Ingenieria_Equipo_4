<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Pizzas</h1>

    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar Pizzas..."
          v-model="busqueda"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          @click="editar(null)"
        >
          <FontAwesomeIcon :icon="['fas', 'plus']" class="text-lg" />
        </button>
      </div>
    </div>

    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="px-6 py-3 text-center font-semibold">Nombre Pizza</th>
            <th class="px-6 py-3 text-center font-semibold">Costo</th>
            <th class="px-6 py-3 text-center font-semibold">Estado</th>
            <th class="px-6 py-3 text-center font-semibold">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in pizzasFiltradas"
            :key="index"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-6 py-3 text-center">{{ item.nombre }}</td>
            <td class="px-6 py-3 text-center">{{ item.precio }}</td>
            <td class="px-6 py-3 text-center" v-if="item.estado == 1">
              <FontAwesomeIcon
                :icon="['fas', 'check']"
                class="text-green-600 text-lg"
              />
            </td>
            <td v-else class="px-6 py-3 text-center">
              <FontAwesomeIcon
                :icon="['fas', 'xmark']"
                class="text-red-600 text-lg"
              />
            </td>
            <td class="px-6 py-3 text-center">
              <button
                class="mr-3 p-1 hover:scale-110 transition-transform"
                @click="editar(item)"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'pencil']"
                  class="text-blue-600 text-lg"
                />
              </button>

              <button
                class="p-1 hover:scale-110 transition-transform"
                @click="verModalReceta(item)"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'file-lines']"
                  class="text-lg"
                />
              </button>
            </td>
          </tr>
          <tr v-if="pizzasFiltradas.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-500">
              No se encontraron Pizzas
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-if="mostrarModal">
    <agregarPizzas />
  </div>

  <div v-if="mostrarModalReceta">
    <modalReceta />
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { usePizzasStore } from "../store/pizzas";
import agregarPizzas from "./agregarPizzas.vue";
import modalReceta from "./modalReceta.vue";
const {
  busqueda,
  pizzasFiltradas,
  mostrarModal,
  mostrarModalReceta,
  getPizzas,
} = storeToRefs(usePizzasStore());
const { editar, eliminar, verModalReceta } = usePizzasStore();
</script>
