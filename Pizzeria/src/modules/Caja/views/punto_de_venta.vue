<template>
  <div class="flex h-screen bg-gray-900 text-white font-sans">
    
    <div class="w-2/3 p-6">
      <h1 class="text-3xl font-bold mb-6">Punto de Venta</h1>
      
      <div class="flex space-x-4 mb-6 border-b border-gray-700">
        <button @click="posStore.cambiarCategoria('pizzas')" :class="categoriaActiva === 'pizzas' ? 'border-blue-500' : 'border-transparent'" class="py-2 px-4 border-b-2 font-semibold focus:outline-none">Pizzas</button>
        <button @click="posStore.cambiarCategoria('bebidas')" :class="categoriaActiva === 'bebidas' ? 'border-blue-500' : 'border-transparent'" class="py-2 px-4 border-b-2 font-semibold focus:outline-none">Bebidas</button>
        <button @click="posStore.cambiarCategoria('extras')" :class="categoriaActiva === 'extras' ? 'border-blue-500' : 'border-transparent'" class="py-2 px-4 border-b-2 font-semibold focus:outline-none">Extras</button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">    
        <div v-if="categoriaActiva === 'pizzas'" v-for="pizza in menu.pizzas" :key="pizza.id" @click="posStore.agregarAOrden(pizza)" class="bg-gray-800 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition-colors">
          <p class="text-xl">🍕</p>
          <p class="font-semibold mt-2">{{ pizza.nombre }}</p>
          <p class="text-gray-400">${{ pizza.precio.toFixed(2) }}</p>
        </div>
        
        <div v-if="categoriaActiva === 'bebidas'" v-for="bebida in menu.bebidas" :key="bebida.id" @click="posStore.agregarAOrden(bebida)" class="bg-gray-800 p-4 rounded-lg text-center cursor-pointer hover:bg-gray-700 transition-colors">
          <p class="text-xl">🥤</p>
          <p class="font-semibold mt-2">{{ bebida.nombre }}</p>
          <p class="text-gray-400">${{ bebida.precio.toFixed(2) }}</p>
        </div>

        <div v-if="categoriaActiva === 'extras'">
            <p class="text-gray-500">No hay extras por ahora.</p>
        </div>
      </div>
    </div>

    <div class="w-1/3 bg-gray-800 p-6 flex flex-col">
      <h2 class="text-2xl font-bold mb-6">Orden Actual</h2>
      
      <div class="flex-grow overflow-y-auto">
        <div v-if="ordenActual.length === 0" class="text-center text-gray-500 pt-10">
            <p>Agrega productos del menú para iniciar una orden.</p>
        </div>

        <div v-for="(item, index) in ordenActual" :key="index" class="flex justify-between items-center mb-4 bg-gray-700 p-3 rounded-lg">
          <div>
            <p class="font-semibold">{{ item.nombre }}</p>
            <p class="text-gray-400 text-sm">${{ item.precio.toFixed(2) }}</p>
          </div>
          <button @click="posStore.quitarDeOrden(index)" class="text-red-500 hover:text-red-400">
            <font-awesome-icon icon="trash-can" />
          </button>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-6 mt-6">
        <div class="flex justify-between font-bold text-xl mb-6">
          <span>Total:</span>
          <span>${{ totalOrden.toFixed(2) }}</span>
        </div>
        <button class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg">
          REALIZAR VENTA
        </button>
         <button @click="posStore.cancelarOrden()" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg mt-2">
          CANCELAR ORDEN
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
// --- LÍNEA CORREGIDA ---
import { usePuntoDeVentaStore } from '../store/punto_venta.js';

// 1. Instanciamos el store
const posStore = usePuntoDeVentaStore();

// 2. Extraemos las variables y computadas que necesitamos del store.
// Usamos storeToRefs para mantener la reactividad.
const { menu, ordenActual, categoriaActiva, totalOrden } = storeToRefs(posStore);

// ¡Y eso es todo! La lógica ahora vive en el store.
// Las funciones se llaman directamente desde la instancia: posStore.agregarAOrden(...)
</script>