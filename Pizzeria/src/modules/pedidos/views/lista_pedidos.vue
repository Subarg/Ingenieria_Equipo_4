<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white">
    <header class="mb-10">
      <h1 class="text-4xl font-bold">Pedidos en Tiempo Real</h1>
    </header>

    <main class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <div class="bg-gray-800 p-4 rounded-lg">
        <h2 class="text-2xl font-semibold mb-6 text-center text-blue-400">Nuevos ({{ nuevosPedidos.length }})</h2>
        <div class="space-y-4">
          <div v-for="pedido in nuevosPedidos" :key="pedido.id" class="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 class="font-bold text-lg">Pedido #{{ pedido.id }} - {{ pedido.cliente }}</h3>
            <ul class="list-disc list-inside my-2 text-gray-300">
              <li v-for="(item, index) in pedido.items" :key="index">{{ item }}</li>
            </ul>
            <button @click="pedidosStore.moverAPreparacion(pedido.id)" class="w-full mt-3 bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold transition-colors">
              Mover a Preparación
            </button>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 p-4 rounded-lg">
        <h2 class="text-2xl font-semibold mb-6 text-center text-yellow-400">En Preparación ({{ pedidosEnPreparacion.length }})</h2>
        <div class="space-y-4">
          <div v-for="pedido in pedidosEnPreparacion" :key="pedido.id" class="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 class="font-bold text-lg">Pedido #{{ pedido.id }} - {{ pedido.cliente }}</h3>
            <ul class="list-disc list-inside my-2 text-gray-300">
              <li v-for="(item, index) in pedido.items" :key="index">{{ item }}</li>
            </ul>
            <button @click="pedidosStore.moverAListo(pedido.id)" class="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 py-2 rounded-md font-semibold transition-colors">
              Mover a Listos
            </button>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 p-4 rounded-lg">
        <h2 class="text-2xl font-semibold mb-6 text-center text-green-400">Listos ({{ pedidosListos.length }})</h2>
        <div class="space-y-4">
          <div v-for="pedido in pedidosListos" :key="pedido.id" class="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 class="font-bold text-lg">Pedido #{{ pedido.id }} - {{ pedido.cliente }}</h3>
            <ul class="list-disc list-inside my-2 text-gray-300">
              <li v-for="(item, index) in pedido.items" :key="index">{{ item }}</li>
            </ul>
            <button @click="pedidosStore.completarPedido(pedido.id)" class="w-full mt-3 bg-green-600 hover:bg-green-700 py-2 rounded-md font-semibold transition-colors">
              Entregar y Completar
            </button>
          </div>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { usePedidosStore } from '../store/pedidos.js';

const pedidosStore = usePedidosStore();

// Usamos storeToRefs para mantener la reactividad de los getters
const { nuevosPedidos, pedidosEnPreparacion, pedidosListos } = storeToRefs(pedidosStore);
</script>