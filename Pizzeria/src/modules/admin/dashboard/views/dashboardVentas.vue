<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-6"
  >
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Ventas</h1>
        <p class="text-gray-600">
          Gestiona y visualiza todas tus transacciones
        </p>
      </div>
      <div
        class="bg-white shadow-md rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label class="text-sm font-semibold text-gray-700"
            >Fecha inicial</label
          >
          <input
            type="date"
            v-model="consulta.fecha_inicial"
            class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="text-sm font-semibold text-gray-700">Fecha final</label>
          <input
            type="date"
            v-model="consulta.fecha_final"
            class="w-full mt-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="md:col-span-1">
          <button
            @click="getVentas"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow transition"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div
          class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">Total Ventas</p>
              <p class="text-3xl font-bold text-gray-800">
                ${{ totalVentastabla }}
              </p>
            </div>
            <div class="bg-blue-50 rounded-full p-3">
              <i class="fas fa-dollar-sign text-blue-700 text-xl"></i>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-xl shadow-md p-6 border-l-4 border-slate-600 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">Transacciones</p>
              <p class="text-3xl font-bold text-gray-800">
                {{ ventas.length }}
              </p>
            </div>
            <div class="bg-slate-100 rounded-full p-3">
              <i class="fas fa-receipt text-slate-700 text-xl"></i>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600 hover:shadow-lg transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm mb-1">Promedio</p>
              <p class="text-3xl font-bold text-gray-800">
                ${{ promedioVentas }}
              </p>
            </div>
            <div class="bg-indigo-50 rounded-full p-3">
              <i class="fas fa-chart-line text-indigo-700 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Card -->
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr
                class="bg-gradient-to-r from-slate-700 to-blue-800 text-white"
              >
                <th class="py-4 px-6 text-left font-semibold">
                  <i class="fas fa-calendar-alt mr-2"></i>Día
                </th>
                <th class="py-4 px-6 text-left font-semibold">
                  <i class="fas fa-tag mr-2"></i>Tipo de venta
                </th>
                <th class="py-4 px-6 text-right font-semibold">
                  <i class="fas fa-dollar-sign mr-2"></i>Total
                </th>
                <th class="py-4 px-6 text-center font-semibold">
                  <i class="fas fa-cog mr-2"></i>Opciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="venta in ventas"
                :key="venta.id"
                class="border-b border-gray-200 hover:bg-blue-50 transition-all duration-200"
              >
                <td class="py-4 px-6 text-gray-700">
                  <div class="flex items-center">
                    <span class="font-medium">{{
                      formatearFecha(venta.fecha)
                    }}</span>
                  </div>
                </td>

                <td class="py-4 px-6">
                  <span
                    :class="
                      venta.tipo_venta === 'comer_aqui'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-slate-100 text-slate-700'
                    "
                    class="px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {{ venta.tipo_venta }}
                  </span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="text-lg font-bold text-gray-800"
                    >${{ venta.total }}</span
                  >
                </td>
                <td class="py-4 px-6 text-center">
                  <button
                    @click="verDetalle(venta)"
                    class="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium shadow hover:shadow-md transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <i class="fas fa-eye"></i>
                    <span>Ver</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div v-if="mostrarModalPedidos">
    <modal-pedido></modal-pedido>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDashboardVentasStore } from "../store/dashboar_de_ventas";
import modalPedido from "./modalPedido.vue";
const {
  consulta,
  ventas,
  totalVentastabla,
  promedioVentas,
  mostrarModalPedidos,
} = storeToRefs(useDashboardVentasStore());
const { getVentas, formatearFecha, abrirModalPedidos } =
  useDashboardVentasStore();

function verDetalle(venta) {
  console.log("Ver detalle de venta:", venta);
  abrirModalPedidos(venta);
}
</script>
