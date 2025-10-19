<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white">
    <header class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-4xl font-bold">Reporte de Compras</h1>
        <p class="text-lg text-gray-400">Fecha: {{ fechaReporte }}</p>
      </div>
      <button @click="reporteStore.imprimirReporte()" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg">
        Imprimir
      </button>
    </header>

    <main class="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="border-b-2 border-gray-700">
            <tr>
              <th class="p-4 text-lg text-gray-300">Producto</th>
              <th class="p-4 text-lg text-gray-300">Proveedor</th>
              <th class="p-4 text-lg text-gray-300 text-center">Cantidad</th>
              <th class="p-4 text-lg text-gray-300 text-right">Precio Unitario</th>
              <th class="p-4 text-lg text-gray-300 text-right">Total</th>
            </tr>
          </thead>
          
          <tbody>
            <tr v-for="compra in comprasConTotal" :key="compra.id" class="border-b border-gray-700 hover:bg-gray-700">
              <td class="p-4 font-semibold text-lg">{{ compra.producto }}</td>
              <td class="p-4 text-gray-300">{{ compra.proveedor }}</td>
              <td class="p-4 text-center">{{ compra.cantidad }} {{ compra.unidad }}</td>
              <td class="p-4 text-right text-gray-300">${{ compra.precioUnitario.toFixed(2) }}</td>
              <td class="p-4 text-right font-bold text-lg">${{ compra.total.toFixed(2) }}</td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="border-t-2 border-gray-600">
              <td colspan="4" class="p-4 text-right text-xl font-bold">GRAN TOTAL:</td>
              <td class="p-4 text-right text-xl font-bold">${{ granTotalCompras.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
// ¡IMPORTANTE! La ruta relativa correcta desde la vista al store
import { useReporteComprasStore } from '../store/reporte_compras.js';

const reporteStore = useReporteComprasStore();

const { fechaReporte, comprasConTotal, granTotalCompras } = storeToRefs(reporteStore);
</script>

<style scoped>
/* Estilos para la impresión */
@media print {
  header, button { display: none; }
  .bg-gray-900 { background-color: white !important; color: black !important; }
  main { box-shadow: none !important; }
  .text-white { color: black !important; }
  .text-gray-300, .text-gray-400 { color: #333 !important; }
}
</style>