<template>
  <div
    v-if="mostrarModal"
    class="absolute top-0 left-0 w-full flex justify-center items-start z-50 mt-6"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Agregar producto
      </h2>

      <form @submit.prevent="guardarProducto" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Producto</label
          >
          <input
            v-model="producto.nombre"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Cantidad</label
          >
          <input
            v-model.number="producto.cantidad"
            type="number"
            step="0.01"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Costo</label>
          <input
            v-model.number="producto.costo"
            type="number"
            step="0.01"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Unidad de medida</label
          >
          <select
            v-model="producto.unidad"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Selecciona una unidad --</option>
            <option value="kg">Kilogramo</option>
            <option value="botella">Botella</option>
            <option value="pieza">Pieza</option>
            <option value="litro">Litro</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Proveedor</label
          >
          <input
            v-model="producto.proveedor"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
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
import { ref } from "vue";
import { useAlmacenStore } from "../store/almacen";
import { storeToRefs } from "pinia";

const { busqueda, productos, productosFiltrados, mostrarModal, producto } =
  storeToRefs(useAlmacenStore());
const { editar, eliminar, guardarProducto, cerrarModal } = useAlmacenStore();
</script>
