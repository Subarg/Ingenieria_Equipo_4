<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white">
    <header class="mb-10">
      <h1 class="text-4xl font-bold">Dashboard de Ventas</h1>
      <p class="text-lg text-gray-400">Resumen del rendimiento del día</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 class="text-gray-400 text-lg">Ventas Totales (MXN)</h2>
        <p class="text-4xl font-bold mt-2">${{ totalVentasMonetario.toFixed(2) }}</p>
      </div>
      
      <div class="bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 class="text-gray-400 text-lg">Productos Vendidos</h2>
        <p class="text-4xl font-bold mt-2">{{ totalItemsVendidos }} <span class="text-2xl">unidades</span></p>
      </div>

      <div class="bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 class="text-gray-400 text-lg">Producto Estrella</h2>
        <p class="text-4xl font-bold mt-2">{{ productoEstrella }}</p>
      </div>
    </div>

    <main class="bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-semibold mb-6">Productos Más Vendidos (por unidad)</h2>
      
      <div class="space-y-4">
        <div v-for="producto in topProductos" :key="producto.id">
          <div class="flex justify-between items-center mb-1">
            <span class="font-semibold">{{ producto.nombre }}</span>
            <span class="text-gray-400">{{ producto.cantidad }} unidades</span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-4">
            <div class="bg-blue-600 h-4 rounded-full" :style="{ width: calcularAnchoBarra(producto.cantidad) }"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useDashboardVentasStore } from '../store/dashboar_de_ventas.js';

const dashboardStore = useDashboardVentasStore();

const { 
  totalVentasMonetario, 
  totalItemsVendidos, 
  topProductos, 
  productoEstrella 
} = storeToRefs(dashboardStore);

// Función para calcular el ancho de la barra
function calcularAnchoBarra(cantidad) {
  // Encontramos la cantidad máxima para que sea el 100%
  const maxCantidad = Math.max(...topProductos.value.map(p => p.cantidad));
  if (maxCantidad === 0) return '0%';
  
  const porcentaje = (cantidad / maxCantidad) * 100;
  return `${porcentaje}%`;
}
</script>

<style scoped>
/* Transición suave para las barras */
.bg-blue-600 {
  transition: width 0.5s ease-in-out;
}
</style>