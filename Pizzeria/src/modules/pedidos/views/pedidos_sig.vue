<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white">
    <!-- Indicador de carga -->
    <div v-if="pedidosStore.loading" class="text-center mb-4">
      <div class="inline-block animate-pulse">
        <p class="text-yellow-400 text-xl">
          <FontAwesomeIcon
            :icon="['fas', 'arrows-rotate']"
            style="color: white"
            class="text-sm"
          />
          Cargando pedidos...
        </p>
      </div>
    </div>

    <!-- Mensaje de error -->
    <div
      v-if="pedidosStore.error"
      class="bg-red-600 p-4 rounded-lg mb-4 shadow-lg"
    >
      <p class="font-semibold">❌ {{ pedidosStore.error }}</p>
      <button
        @click="pedidosStore.obtenerPedidos()"
        class="mt-2 bg-red-800 hover:bg-red-900 px-4 py-2 rounded transition-colors"
      >
        Reintentar
      </button>
    </div>

    <header class="mb-10 flex justify-between items-center">
      <h1 class="text-4xl font-bold">Pedidos en Tiempo Real</h1>
      <button
        @click="pedidosStore.obtenerPedidos()"
        class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
        :disabled="pedidosStore.loading"
      >
        <FontAwesomeIcon
          :icon="['fas', 'rotate-right']"
          style="color: white"
          class="text-sm"
        />
        Actualizar
      </button>
    </header>

    <!-- Mensaje cuando no hay pedidos -->
    <div
      v-if="!pedidosStore.loading && pedidos.length === 0"
      class="text-center text-gray-400 text-xl mt-20"
    >
      <p>📋 No hay pedidos en este momento</p>
    </div>

    <main v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Columna: Nuevos -->
      <div class="bg-gray-800 p-4 rounded-lg">
        <h2 class="text-2xl font-semibold mb-6 text-center text-blue-400">
          Nuevos ({{ nuevosPedidos.length }})
        </h2>
        <div class="space-y-4">
          <div
            v-for="pedido in nuevosPedidos"
            :key="pedido.id_pedido"
            class="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <!-- Header del pedido -->
            <div class="border-b border-gray-600 pb-2 mb-3">
              <h3 class="font-bold text-lg">Pedido #{{ pedido.id_pedido }}</h3>
              <div class="text-sm text-gray-400 mt-1 space-y-1">
                <p>
                  <FontAwesomeIcon
                    :icon="['fas', 'money-bill']"
                    style="color: white"
                    class="text-sm"
                  />Total: ${{ pedido.total }}
                </p>
                <p class="flex items-center gap-2">
                  <FontAwesomeIcon
                    :icon="getTipoVentaConfig(pedido.tipo_venta).icon"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ getTipoVentaConfig(pedido.tipo_venta).text }}
                </p>
                <p v-if="pedido.direccion">
                  <FontAwesomeIcon
                    :icon="['fas', 'map-pin']"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ pedido.direccion }}
                </p>
                <p v-if="pedido.fecha">
                  <FontAwesomeIcon
                    :icon="['fas', 'clock']"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ formatFecha(pedido.fecha) }}
                </p>
              </div>
            </div>

            <!-- Items del pedido -->
            <div class="mb-3">
              <p class="text-xs text-gray-400 mb-2">Productos:</p>
              <ul class="list-disc list-inside text-gray-300 space-y-1">
                <li
                  v-for="(item, index) in pedido.detalle"
                  :key="index"
                  class="text-sm"
                >
                  {{ item.cantidad }}x
                  {{ item.nombre_producto || item.producto.nombre }}
                  <span class="text-gray-500"
                    >(${{ item.precio_unitario || item.precio }})</span
                  >
                </li>
              </ul>
            </div>

            <button
              @click="moverAPrepacion(pedido.id_pedido)"
              class="w-full mt-3 bg-blue-600 hover:bg-blue-700 py-2 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="procesando === pedido.id_pedido"
            >
              <FontAwesomeIcon
                v-if="procesando === pedido.id_pedido"
                :icon="['fas', 'hourglass-half']"
                style="color: white"
                class="text-sm"
              />
              {{
                procesando === pedido.id_pedido
                  ? "Procesando..."
                  : "Mover a Preparación"
              }}
            </button>
          </div>

          <!-- Mensaje si no hay pedidos nuevos -->
          <div
            v-if="nuevosPedidos.length === 0"
            class="text-center text-gray-500 py-8"
          >
            <p>Sin pedidos nuevos</p>
          </div>
        </div>
      </div>

      <!-- Columna: En Preparación -->
      <div class="bg-gray-800 p-4 rounded-lg">
        <h2 class="text-2xl font-semibold mb-6 text-center text-yellow-400">
          En Preparación ({{ pedidosEnPreparacion.length }})
        </h2>
        <div class="space-y-4">
          <div
            v-for="pedido in pedidosEnPreparacion"
            :key="pedido.id_pedido"
            class="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <!-- Header del pedido -->
            <div class="border-b border-gray-600 pb-2 mb-3">
              <h3 class="font-bold text-lg">Pedido #{{ pedido.id_pedido }}</h3>
              <div class="text-sm text-gray-400 mt-1 space-y-1">
                <p>
                  <FontAwesomeIcon
                    :icon="['fas', 'money-bill']"
                    style="color: white"
                    class="text-sm"
                  />
                  Total: ${{ pedido.total }}
                </p>
                <p class="flex items-center gap-2">
                  <FontAwesomeIcon
                    :icon="getTipoVentaConfig(pedido.tipo_venta).icon"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ getTipoVentaConfig(pedido.tipo_venta).text }}
                </p>
                <p v-if="pedido.direccion">
                  <FontAwesomeIcon
                    :icon="['fas', 'map-pin']"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ pedido.direccion }}
                </p>
                <p v-if="pedido.fecha">
                  <FontAwesomeIcon
                    :icon="['fas', 'clock']"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ formatFecha(pedido.fecha) }}
                </p>
              </div>
            </div>

            <!-- Items del pedido -->
            <div class="mb-3">
              <p class="text-xs text-gray-400 mb-2">Productos:</p>
              <ul class="list-disc list-inside text-gray-300 space-y-1">
                <li
                  v-for="(item, index) in pedido.detalle"
                  :key="index"
                  class="text-sm"
                >
                  {{ item.cantidad }}x
                  {{ item.nombre_producto || item.producto.nombre }}
                  <span class="text-gray-500"
                    >(${{ item.precio_unitario || item.precio }})</span
                  >
                </li>
              </ul>
            </div>

            <button
              @click="moverAListos(pedido.id_pedido)"
              class="w-full mt-3 bg-yellow-600 hover:bg-yellow-700 py-2 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="procesando === pedido.id_pedido"
            >
              <FontAwesomeIcon
                v-if="procesando === pedido.id_pedido"
                :icon="['fas', 'hourglass-half']"
                style="color: white"
                class="text-sm"
              />
              {{
                procesando === pedido.id_pedido
                  ? " Procesando..."
                  : "Mover a Listos"
              }}
            </button>
          </div>

          <!-- Mensaje si no hay pedidos en preparación -->
          <div
            v-if="pedidosEnPreparacion.length === 0"
            class="text-center text-gray-500 py-8"
          >
            <p>Sin pedidos en preparación</p>
          </div>
        </div>
      </div>

      <!-- Columna: Listos -->
      <div class="bg-gray-800 p-4 rounded-lg">
        <h2 class="text-2xl font-semibold mb-6 text-center text-green-400">
          Listos ({{ pedidosListos.length }})
        </h2>
        <div class="space-y-4">
          <div
            v-for="pedido in pedidosListos"
            :key="pedido.id_pedido"
            class="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <!-- Header del pedido -->
            <div class="border-b border-gray-600 pb-2 mb-3">
              <h3 class="font-bold text-lg">Pedido #{{ pedido.id_pedido }}</h3>
              <div class="text-sm text-gray-400 mt-1 space-y-1">
                <p>
                  <FontAwesomeIcon
                    :icon="['fas', 'money-bill']"
                    style="color: white"
                    class="text-sm"
                  />
                  Total: ${{ pedido.total }}
                </p>
                <p class="flex items-center gap-2">
                  <FontAwesomeIcon
                    :icon="getTipoVentaConfig(pedido.tipo_venta).icon"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ getTipoVentaConfig(pedido.tipo_venta).text }}
                </p>
                <p v-if="pedido.direccion">
                  <FontAwesomeIcon
                    :icon="['fas', 'map-pin']"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ pedido.direccion }}
                </p>
                <p v-if="pedido.fecha">
                  <FontAwesomeIcon
                    :icon="['fas', 'clock']"
                    style="color: white"
                    class="text-sm"
                  />
                  {{ formatFecha(pedido.fecha) }}
                </p>
              </div>
            </div>

            <!-- Items del pedido -->
            <div class="mb-3">
              <p class="text-xs text-gray-400 mb-2">Productos:</p>
              <ul class="list-disc list-inside text-gray-300 space-y-1">
                <li
                  v-for="(item, index) in pedido.detalle"
                  :key="index"
                  class="text-sm"
                >
                  {{ item.cantidad }}x
                  {{ item.nombre_producto || item.producto.nombre }}
                  <span class="text-gray-500"
                    >(${{ item.precio_unitario || item.precio }})</span
                  >
                </li>
              </ul>
            </div>

            <button
              @click="completar(pedido.id_pedido)"
              class="w-full mt-3 bg-green-600 hover:bg-green-700 py-2 rounded-md font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="procesando === pedido.id_pedido"
            >
              <FontAwesomeIcon
                v-if="procesando === pedido.id_pedido"
                :icon="['fas', 'hourglass-half']"
                style="color: white"
                class="text-sm"
              />
              {{
                procesando === pedido.id_pedido
                  ? " Procesando..."
                  : "Entregar y Completar"
              }}
            </button>
          </div>

          <!-- Mensaje si no hay pedidos listos -->
          <div
            v-if="pedidosListos.length === 0"
            class="text-center text-gray-500 py-8"
          >
            <p>Sin pedidos listos</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, h } from "vue";
import { storeToRefs } from "pinia";
import { usePedidosStore } from "../store/pedidos.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const pedidosStore = usePedidosStore();

// Usamos storeToRefs para mantener la reactividad
const { pedidos, nuevosPedidos, pedidosEnPreparacion, pedidosListos } =
  storeToRefs(pedidosStore);

// Estado para controlar qué pedido se está procesando
const procesando = ref(null);

// Configuración de iconos por tipo de venta
const tiposVentaConfig = {
  domicilio: { icon: ["fas", "house"], text: "Domicilio" },
  comer_aqui: { icon: ["fas", "utensils"], text: "Comer Aquí" },
  llevar: { icon: ["fas", "bag-shopping"], text: "Para Llevar" },
};

// Funciones auxiliares de formato
function getTipoVentaConfig(tipo) {
  return tiposVentaConfig[tipo] || { icon: ["fas", "question"], text: tipo };
}

function formatFecha(fecha) {
  if (!fecha) return "";
  const date = new Date(fecha);
  return date.toLocaleString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Funciones con manejo de errores
async function moverAPrepacion(idPedido) {
  procesando.value = idPedido;
  try {
    await pedidosStore.moverAPreparacion(idPedido);
  } catch (error) {
    alert("Error al mover el pedido a preparación");
  } finally {
    procesando.value = null;
  }
}

async function moverAListos(idPedido) {
  procesando.value = idPedido;
  try {
    await pedidosStore.moverAListo(idPedido);
  } catch (error) {
    alert("Error al mover el pedido a listos");
  } finally {
    procesando.value = null;
  }
}

async function completar(idPedido) {
  procesando.value = idPedido;
  try {
    await pedidosStore.completarPedido(idPedido);
  } catch (error) {
    alert("Error al completar el pedido");
  } finally {
    procesando.value = null;
  }
}
</script>
