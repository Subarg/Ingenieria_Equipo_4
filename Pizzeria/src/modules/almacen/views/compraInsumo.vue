<template>
  <div
    class="absolute top-0 left-0 w-full flex justify-center items-start z-50 mt-6"
    @click.self="cerrarModal"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-gray-800">Registrar Compra</h2>
        <button
          @click="cerrarModal"
          class="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <form @submit.prevent="registrarCompra">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar Insumo
          </label>
          <select
            v-model="compra.id_insumo"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>-- Seleccione un producto --</option>
            <option
              v-for="producto in productos"
              :key="producto.id"
              :value="producto.id_insumo"
            >
              {{ producto.nombre }} ({{ producto.unidad_de_medida }})
            </option>
          </select>
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Cantidad
          </label>
          <input
            type="number"
            v-model.number="compra.cantidad"
            required
            min="0.01"
            step="0.01"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ej: 10"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Costo Total de la Compra
          </label>
          <input
            type="number"
            v-model.number="compra.costoTotal"
            required
            min="0.01"
            step="0.01"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Ej: 500.00"
          />
        </div>

        <div
          v-if="compra.cantidad && compra.costoTotal"
          class="mb-4 p-3 bg-gray-50 rounded-lg"
        >
          <p class="text-sm text-gray-700">
            <strong>Costo por unidad:</strong> ${{ costoUnitario.toFixed(2) }}
          </p>
        </div>

        <div class="flex gap-3">
          <button
            type="button"
            @click="cerrarModal"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Registrar Compra
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAlmacenStore } from "../store/almacen";
import { storeToRefs } from "pinia";

const { productos, compra } = storeToRefs(useAlmacenStore());
const { cerrarModalCompra, registrarCompra } = useAlmacenStore();

const costoUnitario = computed(() => {
  if (compra.value.cantidad && compra.value.costoTotal) {
    return compra.value.costoTotal / compra.value.cantidad;
  }
  return 0;
});

const cerrarModal = () => {
  compra.value = {
    id_insumo: "",
    cantidad: null,
    costoTotal: null,
  };
  cerrarModalCompra();
};

const guardarCompra = () => {
  const producto = productos.value.find((p) => p.id === compra.value.id_insumo);
};
</script>
