<template>
  <div class="fixed inset-0 flex justify-center items-center z-50">
    <div
      class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fadeIn"
    >
      <h2 class="text-xl font-bold text-gray-800 text-center">
        ⚠️ Confirmar alarma de bajo stock
      </h2>

      <p class="text-gray-600 mt-4 text-center">
        ¿Seguro que quieres crear una alarma de bajo stock para el insumo
        <span class="font-semibold text-red-600">{{
          insumoAlarma.nombre
        }}</span>
        con
        <span class="font-semibold">{{
          insumoAlarma.cantidad_en_almacen
        }}</span>
        en almacén?
      </p>

      <div class="flex justify-center gap-4 mt-6">
        <button
          class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          @click="cerrarModalCrearAlarma"
        >
          Cancelar
        </button>

        <button
          class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          @click="crearAlarma"
        >
          Crear alarma
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useAlmacenStore } from "../store/almacen";
import { storeToRefs } from "pinia";

const { insumoAlarma } = storeToRefs(useAlmacenStore());
const { cerrarModalCrearAlarma, crearAlarma } = useAlmacenStore();
</script>
