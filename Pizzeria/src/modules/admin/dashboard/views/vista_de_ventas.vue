<template>
  <div class="bg-gray-900 min-h-screen p-8 text-white">
    <header class="mb-10">
      <h1 class="text-4xl font-bold">Dashboard de Ventas</h1>
      <p class="text-lg text-gray-400">Resumen del rendimiento</p>
    </header>

    <!-- Filtros de Fecha -->
    <div class="bg-gray-800 p-6 rounded-2xl shadow-lg mb-6">
      <h2 class="text-xl font-semibold mb-4">Filtrar por Período</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-gray-400 mb-2">Fecha Inicial</label>
          <input
            v-model="fechaInicial"
            type="date"
            class="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-gray-400 mb-2">Fecha Final</label>
          <input
            v-model="fechaFinal"
            type="date"
            class="w-full bg-gray-700 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="aplicarFiltro"
            :disabled="loading"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Aplicar Filtro</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                  fill="none"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Cargando...
            </span>
          </button>
        </div>
      </div>

      <!-- Mensaje de error -->
      <div
        v-if="error"
        class="mt-4 bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg"
      >
        <p class="font-semibold">Error:</p>
        <p>{{ error }}</p>
      </div>
    </div>

    <!-- Indicador de carga global -->
    <div v-if="loading" class="text-center py-10">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
      <p class="mt-4 text-gray-400">Cargando estadísticas...</p>
    </div>

    <!-- Contenido principal -->
    <div v-else>
      <!-- Tarjetas de Resumen -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div class="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 class="text-gray-400 text-lg">Ventas Totales (MXN)</h2>
          <p class="text-4xl font-bold mt-2">
            ${{ totalVentasMonetario.toFixed(2) }}
          </p>
        </div>

        <div class="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 class="text-gray-400 text-lg">Productos Vendidos</h2>
          <p class="text-4xl font-bold mt-2">
            {{ totalItemsVendidos }} <span class="text-2xl">unidades</span>
          </p>
        </div>

        <div class="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 class="text-gray-400 text-lg">Producto Estrella</h2>
          <p class="text-4xl font-bold mt-2">{{ productoEstrella }}</p>
        </div>
      </div>

      <!-- Mensaje si no hay datos -->
      <div
        v-if="topProductos.length === 0"
        class="text-center py-10 bg-gray-800 rounded-2xl"
      >
        <p class="text-2xl text-gray-400">
          No hay datos para mostrar en este período
        </p>
        <p class="text-gray-500 mt-2">
          Intenta seleccionar un rango de fechas diferente
        </p>
      </div>

      <!-- Gráficas y Detalles -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Gráfica de Pastel -->
        <div class="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-semibold mb-6">Distribución de Ventas</h2>
          <div class="flex justify-center">
            <canvas ref="chartCanvas" class="max-w-md"></canvas>
          </div>
        </div>

        <!-- Lista de Productos -->
        <div class="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-semibold mb-6">
            Productos Más Vendidos (por unidad)
          </h2>

          <div class="space-y-4">
            <div v-for="producto in topProductos" :key="producto.id">
              <div class="flex justify-between items-center mb-1">
                <span class="font-semibold">{{ producto.nombre }}</span>
                <span class="text-gray-400">
                  {{ producto.cantidad }} unidades
                </span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-4">
                <div
                  class="bg-blue-600 h-4 rounded-full transition-all duration-500"
                  :style="{ width: calcularAnchoBarra(producto.cantidad) }"
                ></div>
              </div>
              <div
                class="flex justify-between items-center mt-1 text-sm text-gray-500"
              >
                <span>{{ producto.vecesVendida }} ventas</span>
                <span>${{ producto.ventaTotal }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useDashboardVentasStore } from "../store/dashboar_de_ventas.js";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Legend);

const dashboardStore = useDashboardVentasStore();
const { cargarVentas, filtrarPorFechas } = dashboardStore;

const {
  totalVentasMonetario,
  totalItemsVendidos,
  topProductos,
  productoEstrella,
  loading,
  error,
} = storeToRefs(dashboardStore);

const fechaInicial = ref("");
const fechaFinal = ref("");
const chartCanvas = ref(null);
let chartInstance = null;

const inicializarFechas = () => {
  const hoy = new Date();
  const hace30Dias = new Date();
  hace30Dias.setDate(hoy.getDate() - 30);

  fechaFinal.value = hoy.toISOString().split("T")[0];
  fechaInicial.value = hace30Dias.toISOString().split("T")[0];
};

const aplicarFiltro = async () => {
  if (fechaInicial.value && fechaFinal.value) {
    // Actualizar las fechas en el store
    filtrarPorFechas(fechaInicial.value, fechaFinal.value);

    // Cargar los datos
    await cargarVentas();

    // Actualizar la gráfica después de cargar los datos
    actualizarGrafica();
  }
};

function calcularAnchoBarra(cantidad) {
  const maxCantidad = Math.max(...topProductos.value.map((p) => p.cantidad));
  if (maxCantidad === 0) return "0%";

  const porcentaje = (cantidad / maxCantidad) * 100;
  return `${porcentaje}%`;
}

const actualizarGrafica = () => {
  if (!chartCanvas.value || topProductos.value.length === 0) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const colores = [
    "#3B82F6", // Azul
    "#EF4444", // Rojo
    "#10B981", // Verde
    "#F59E0B", // Amarillo
    "#8B5CF6", // Púrpura
    "#EC4899", // Rosa
    "#14B8A6", // Teal
    "#F97316", // Naranja
  ];

  const ctx = chartCanvas.value.getContext("2d");

  chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: topProductos.value.map((p) => p.nombre),
      datasets: [
        {
          data: topProductos.value.map((p) => p.cantidad),
          backgroundColor: colores.slice(0, topProductos.value.length),
          borderColor: "#1F2937",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#fff",
            padding: 15,
            font: {
              size: 12,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const porcentaje = ((value / total) * 100).toFixed(1);
              return `${label}: ${value} unidades (${porcentaje}%)`;
            },
          },
        },
      },
    },
  });
};

// Observar cambios en topProductos para actualizar la gráfica
watch(
  topProductos,
  () => {
    actualizarGrafica();
  },
  { deep: true }
);

// Inicializar al montar el componente
onMounted(async () => {
  inicializarFechas();
  await aplicarFiltro();
});
</script>

<style scoped>
.bg-blue-600 {
  transition: width 0.5s ease-in-out;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
