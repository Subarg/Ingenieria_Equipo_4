<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Ventas</h1>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr class="bg-gray-200 text-gray-700">
            <th class="py-2 px-4 text-left">Día</th>
            <th class="py-2 px-4 text-left">Vendedor</th>
            <th class="py-2 px-4 text-left">Tipo de venta</th>
            <th class="py-2 px-4 text-right">Total</th>
            <th class="py-2 px-4 text-center">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="venta in ventas"
            :key="venta.id"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-2 px-4">{{ venta.dia }}</td>
            <td class="py-2 px-4">{{ venta.vendedor }}</td>
            <td class="py-2 px-4">{{ venta.tipo }}</td>
            <td class="py-2 px-4 text-right font-semibold">
              ${{ venta.total }}
            </td>
            <td class="py-2 px-4 text-center">
              <button
                @click="verDetalle(venta)"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center justify-center gap-1"
              >
                <i class="fas fa-eye"></i>
                Ver
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Datos de ejemplo
const ventas = ref([
  { id: 1, dia: "2025-11-16", vendedor: "Juan", tipo: "Online", total: 250 },
  { id: 2, dia: "2025-11-15", vendedor: "Ana", tipo: "Tienda", total: 400 },
  { id: 3, dia: "2025-11-14", vendedor: "Pedro", tipo: "Online", total: 150 },
]);

function verDetalle(venta) {
  console.log("Ver detalle de venta:", venta);
  // Aquí luego abriremos el modal
}
</script>

<style>
/* Para que funcionen los iconos de Font Awesome */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
