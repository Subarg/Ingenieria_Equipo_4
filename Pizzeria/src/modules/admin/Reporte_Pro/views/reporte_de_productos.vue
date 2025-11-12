<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white">
    <header class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-4xl font-bold">Reporte de Compras</h1>
        <p class="text-lg text-gray-400">Fecha: {{ fechaReporte }}</p>
      </div>
      <button
        @click="imprimirReporte"
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
      >
        Imprimir
      </button>
    </header>

    <main id="reporte" class="bg-gray-800 p-6 rounded-2xl shadow-lg text-white">
      <div
        class="flex justify-between items-center mb-6 border-b border-gray-600 pb-3"
      >
        <p><strong>Usuario:</strong> {{ usuario }}</p>
        <p><strong>Fecha del reporte:</strong> {{ fechaReporte }}</p>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="border-b-2 border-gray-700">
            <tr>
              <th class="p-4 text-lg text-gray-300">Producto</th>
              <th class="p-4 text-lg text-gray-300">Proveedor</th>
              <th class="p-4 text-lg text-gray-300 text-center">Cantidad</th>
              <th class="p-4 text-lg text-gray-300 text-right">
                Precio Unitario
              </th>
              <th class="p-4 text-lg text-gray-300 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="compra in comprasConTotal"
              :key="compra.id"
              class="border-b border-gray-700 hover:bg-gray-700"
            >
              <td class="p-4 font-semibold text-lg">{{ compra.producto }}</td>
              <td class="p-4 text-gray-300">{{ compra.proveedor }}</td>
              <td class="p-4 text-center">
                {{ compra.cantidad }} {{ compra.unidad }}
              </td>
              <td class="p-4 text-right text-gray-300">
                ${{ compra.precioUnitario.toFixed(2) }}
              </td>
              <td class="p-4 text-right font-bold text-lg">
                ${{ compra.total.toFixed(2) }}
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="border-t-2 border-gray-600">
              <td colspan="4" class="p-4 text-right text-xl font-bold">
                GRAN TOTAL:
              </td>
              <td class="p-4 text-right text-xl font-bold">
                ${{ granTotalCompras.toFixed(2) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useReporteComprasStore } from "../store/reporte_compras.js";
import printJS from "print-js";

const reporteStore = useReporteComprasStore();
const { fechaReporte, comprasConTotal, granTotalCompras } =
  storeToRefs(reporteStore);

const usuario = "user";

function imprimirReporte() {
  printJS({
    printable: "reporte",
    type: "html",
    targetStyles: ["*"],
    style: `
      @page { size: A4; margin: 20mm; }
      body { font-family: 'Arial', sans-serif; color: #0000; }
      h1, h2, h3, th, td, p, strong {
        color: #000 !important;
        font-weight: 600;
      }
      th { background-color: #f0f0f0; }
      td, th { border-bottom: 1px solid #ccc; }
      table { border-collapse: collapse; width: 100%; }
      tfoot td {
        font-size: 1.1rem;
        border-top: 2px solid #000;
      }
      p, td, th { font-size: 0.95rem; }
    `,
  });
}
</script>
