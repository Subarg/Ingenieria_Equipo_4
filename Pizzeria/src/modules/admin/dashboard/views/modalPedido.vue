<template>
  <!-- Modal -->
  <div
    class="fixed inset-0 flex justify-center items-center z-50 pointer-events-none"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold">
            Desglose del Pedido #{{ pedidoSeleccionado.id_pedido }}
          </h2>
          <button
            @click="closeModal"
            class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div class="flex flex-wrap gap-4 text-sm">
          <div
            class="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 py-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span>{{ formatDate(pedidoSeleccionado.fecha) }}</span>
          </div>
          <div
            class="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-3 py-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Body -->
      <div class="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b-2 border-gray-300">
                <th class="text-left py-3 px-2 font-semibold text-gray-700">
                  Producto
                </th>
                <th class="text-center py-3 px-2 font-semibold text-gray-700">
                  Cantidad
                </th>
                <th class="text-right py-3 px-2 font-semibold text-gray-700">
                  Precio
                </th>
                <th class="text-right py-3 px-2 font-semibold text-gray-700">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in pedidoSeleccionado.detalle"
                :key="item.id_detalle"
                class="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td class="py-3 px-2">
                  <div class="font-medium text-gray-800">
                    {{ item.producto.nombre }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ item.producto.tipo }}
                  </div>
                </td>
                <td class="text-center py-3 px-2 text-gray-700">
                  {{ item.cantidad }}
                </td>
                <td class="text-right py-3 px-2 text-gray-700">
                  ${{ parseFloat(item.precio).toFixed(2) }}
                </td>
                <td class="text-right py-3 px-2 font-medium text-gray-800">
                  ${{ (item.cantidad * parseFloat(item.precio)).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer -->
      <div class="border-t-2 border-gray-300 bg-gray-50 p-6">
        <div class="flex justify-between items-center">
          <span class="text-xl font-bold text-gray-700">Total:</span>
          <span class="text-3xl font-bold text-orange-500"
            >${{ pedidoSeleccionado.total.toFixed(2) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDashboardVentasStore } from "../store/dashboar_de_ventas";

const { mostrarModalPedidos, pedidoSeleccionado } = storeToRefs(
  useDashboardVentasStore()
);
const { cerrarModalPedidos } = useDashboardVentasStore();

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function getMetodoPagoLabel(metodo) {
  const metodos = {
    transferencia: "Transferencia",
    efectivo: "Efectivo",
    tarjeta: "Tarjeta",
  };
  return metodos[metodo] || metodo;
}
</script>
