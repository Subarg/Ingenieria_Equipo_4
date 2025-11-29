<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Almacén</h1>
    <div v-if="rol_id == 1">
      <button
        @click="mostrarAlertas = true"
        class="relative p-3 rounded-full hover:scale-110 transition-transform"
      >
        <FontAwesomeIcon
          :icon="['fas', 'bell']"
          class="text-yellow-400 text-3xl drop-shadow-sm"
        />
        <span
          v-if="alertas.length > 0"
          class="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md"
        >
          {{ alertas.length }}
        </span>
      </button>
    </div>

    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar producto..."
          v-model="busqueda"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          v-if="rol_id == 1"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          @click="editar(null)"
        >
          <FontAwesomeIcon :icon="['fas', 'plus']" class="text-lg" />
        </button>
        <button
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          @click="abrirModalCompra"
        >
          <FontAwesomeIcon :icon="['fas', 'cart-shopping']" class="text-lg" />
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
            <td class="px-6 py-3 text-center">{{ item.nombre }}</td>
            <td class="px-6 py-3 text-center">
              {{ item.cantidad_en_almacen }}
            </td>
            <td class="px-6 py-3 text-center">
              ${{ (+item.costo).toFixed(2) }}
            </td>
            <td class="px-6 py-3 text-center">{{ item.unidad_de_medida }}</td>
            <td class="px-6 py-3 text-center">
              <button
                class="mr-3 p-1 hover:scale-110 transition-transform"
                @click="editar(item)"
                v-if="rol_id == 1"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'pencil']"
                  class="text-blue-600 text-lg"
                />
              </button>

              <button
                class="p-1 hover:scale-110 transition-transform"
                @click="abrirModalCrearAlarma(item)"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'circle-exclamation']"
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
  <div v-if="mostrarModalCompra">
    <compraInsumo />
  </div>
  <div v-if="modalCrearAlarma">
    <alerta></alerta>
  </div>
  <div v-if="mostrarAlertas">
    <alertasModal />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAlmacenStore } from "../store/almacen";
import { storeToRefs } from "pinia";
import agregarProducto from "./agregarProducto.vue";
import compraInsumo from "./compraInsumo.vue";
import alerta from "./alerta.vue";
import alertasModal from "./alertasModal.vue";
const {
  busqueda,
  productos,
  productosFiltrados,
  mostrarModal,
  producto,
  mostrarModalCompra,
  crearAlarma,
  modalCrearAlarma,
  alertas,
  mostrarAlertas,
} = storeToRefs(useAlmacenStore());
const { editar, eliminar, abrirModalCompra, abrirModalCrearAlarma } =
  useAlmacenStore();

const rol_id = localStorage.getItem("rol_id");
</script>
