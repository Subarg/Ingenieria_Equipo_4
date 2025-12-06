<template>
  <div
    class="fixed inset-0 flex justify-center items-center z-50 pointer-events-none"
  >
    <div
      class="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg pointer-events-auto animate-fadeIn"
    >
      <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">
        🔔 Alertas
      </h2>

      <div class="overflow-x-auto mt-4">
        <table class="min-w-full border text-sm text-gray-700">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2 text-center border font-semibold">Insumo</th>
              <th class="px-4 py-2 text-center border font-semibold">
                Cantidad
              </th>
              <th class="px-4 py-2 text-center border font-semibold">
                Atender
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="alerta in alertas"
              :key="alerta.id"
              class="border hover:bg-gray-50"
            >
              <td class="px-4 py-2 text-center border">
                {{ alerta.insumo.nombre }}
              </td>

              <td class="px-4 py-2 text-center border">
                {{ alerta.cantidad_alerta }}
              </td>

              <td class="px-4 py-2 text-center border">
                <button
                  class="p-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                  @click="marcarAlerta(alerta)"
                >
                  <FontAwesomeIcon :icon="['fas', 'check']" />
                </button>
              </td>
            </tr>

            <tr v-if="alertas.length === 0">
              <td colspan="3" class="text-center py-4 text-gray-500">
                No hay alertas pendientes
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-center mt-6">
        <button
          class="px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg transition"
          @click="mostrarAlertas = false"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useAlmacenStore } from "../store/almacen";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const almacenStore = useAlmacenStore();
const { alertas, mostrarAlertas } = storeToRefs(almacenStore);
const { marcarAlerta, cerrarModalAlerta } = almacenStore;
</script>
