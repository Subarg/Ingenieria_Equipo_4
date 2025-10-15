<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-2xl bg-gray-800 p-8 rounded-2xl shadow-lg text-white">
      
      <h1 class="text-3xl font-bold text-center mb-8">Corte de Caja</h1>

      <div v-if="!corteRealizado">
        <div class="space-y-6">
          <div>
            <label for="fondoInicial" class="block text-lg font-medium text-gray-300">Fondo Inicial ($)</label>
            <input type="number" v-model.number="fondoInicial" id="fondoInicial" class="mt-2 bg-gray-700 text-white w-full py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: 500.00">
          </div>
          <div>
            <label for="efectivoFinal" class="block text-lg font-medium text-gray-300">Efectivo Final Contado en Caja ($)</label>
            <input type="number" v-model.number="efectivoEnCaja" id="efectivoFinal" class="mt-2 bg-gray-700 text-white w-full py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ej: 2100.00">
          </div>
        </div>
        <button @click="corteStore.realizarCorte()" class="w-full mt-10 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition-colors">
          Realizar Corte
        </button>
      </div>
      
      <div v-else class="space-y-4">
        <h2 class="text-2xl font-semibold text-center border-b border-gray-600 pb-4">Resumen del Turno</h2>
        <div class="flex justify-between text-lg py-3 border-b border-gray-700">
          <span class="text-gray-400">Ventas en Efectivo:</span>
          <span class="font-semibold">${{ ventasEnEfectivo.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-lg py-3 border-b border-gray-700">
          <span class="text-gray-400">Ventas con Tarjeta:</span>
          <span class="font-semibold">${{ ventasConTarjeta.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-xl font-bold py-3 border-b border-gray-600">
          <span class="text-white">Ventas Totales:</span>
          <span>${{ ventasTotales.toFixed(2) }}</span>
        </div>
        
        <div class="pt-6 space-y-4">
          <div class="flex justify-between text-lg">
            <span class="text-gray-400">Dinero Esperado en Caja:</span>
            <span class="font-semibold">${{ dineroEsperadoEnCaja.toFixed(2) }}</span>
          </div>
           <div class="flex justify-between text-lg">
            <span class="text-gray-400">Dinero Contado en Caja:</span>
            <span class="font-semibold">${{ efectivoEnCaja.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-2xl font-bold p-4 rounded-lg" :class="diferencia === 0 ? 'bg-gray-700' : diferencia > 0 ? 'bg-green-800' : 'bg-red-800'">
            <span>Diferencia ({{ diferencia > 0 ? 'Sobrante' : 'Faltante' }}):</span>
            <span>${{ diferencia.toFixed(2) }}</span>
          </div>
        </div>
        
        <button @click="corteStore.nuevoCorte()" class="w-full mt-8 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg text-lg transition-colors">
          Iniciar Nuevo Corte
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCorteCajaStore } from '../store/corte_caja.js';

const corteStore = useCorteCajaStore();

const { 
  fondoInicial, 
  efectivoEnCaja, 
  corteRealizado,
  ventasEnEfectivo,
  ventasConTarjeta,
  ventasTotales,
  dineroEsperadoEnCaja,
  diferencia
} = storeToRefs(corteStore);
</script>