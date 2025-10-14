<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Almacén</h1>

    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar producto..."
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
            <th class="px-6 py-3 text-center font-semibold">Producto</th>
            <th class="px-6 py-3 text-center font-semibold">
              Cantidad en almacén
            </th>
            <th class="px-6 py-3 text-center font-semibold">Costo</th>
            <th class="px-6 py-3 text-center font-semibold">
              Unidad de medida
            </th>
            <th class="px-6 py-3 text-center font-semibold">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in productosFiltrados"
            :key="index"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-6 py-3 text-center">{{ item.producto }}</td>
            <td class="px-6 py-3 text-center">{{ item.cantidad }}</td>
            <td class="px-6 py-3 text-center">${{ item.costo.toFixed(2) }}</td>
            <td class="px-6 py-3 text-center">{{ item.unidad }}</td>
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
                @click="eliminar(item)"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'trash-can']"
                  class="text-red-600 text-lg"
                />
              </button>
            </td>
          </tr>
          <tr v-if="productosFiltrados.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-500">
              No se encontraron productos
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-if="mostrarModal">
    <agregarProducto />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAlmacenStore } from "../store/almacen";
import { storeToRefs } from "pinia";
import agregarProducto from "./agregarProducto.vue";
const { busqueda, productos, productosFiltrados, mostrarModal, producto } =
  storeToRefs(useAlmacenStore());
const { editar, eliminar } = useAlmacenStore();
</script>
