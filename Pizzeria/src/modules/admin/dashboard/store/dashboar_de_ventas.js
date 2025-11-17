import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useDashboardVentasStore = defineStore("dashboardVentas", () => {
  const pizzasVendidas = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const fechaInicial = ref(null);
  const fechaFinal = ref(null);

  const totalVentasMonetario = computed(() => {
    return pizzasVendidas.value.reduce((total, pizza) => {
      return total + parseFloat(pizza.venta_total || 0);
    }, 0);
  });

  const totalItemsVendidos = computed(() => {
    return pizzasVendidas.value.reduce((total, pizza) => {
      return total + parseInt(pizza.cantidad || 0);
    }, 0);
  });

  const topProductos = computed(() => {
    return pizzasVendidas.value.map((pizza) => ({
      id: pizza.id_producto,
      nombre: pizza.nombre,
      cantidad: parseInt(pizza.cantidad || 0),
      ventaTotal: parseFloat(pizza.venta_total || 0),
      vecesVendida: parseInt(pizza.veces_vendida || 0),
    }));
  });

  const productoEstrella = computed(() => {
    if (pizzasVendidas.value.length === 0) {
      return "N/A";
    }
    return pizzasVendidas.value[0].nombre;
  });

  async function cargarVentas() {
    loading.value = true;
    error.value = null;

    try {
      const response = await axios.post("get-pizzas-reporte", {
        fechaInicial: fechaInicial.value,
        fechaFinal: fechaFinal.value,
      });

      if (response.data.success) {
        pizzasVendidas.value = response.data.data;
      } else {
        error.value = "No se pudieron cargar las ventas";
        pizzasVendidas.value = [];
      }
    } catch (err) {
      console.error("Error al cargar ventas:", err);
      error.value = err.message || "Error al cargar los datos";
      pizzasVendidas.value = [];
    } finally {
      loading.value = false;
    }
  }

  function filtrarPorFechas(inicio, fin) {
    fechaInicial.value = inicio;
    fechaFinal.value = fin;
  }

  return {
    // Estado
    pizzasVendidas,
    loading,
    error,
    fechaInicial,
    fechaFinal,

    // Computed
    totalVentasMonetario,
    totalItemsVendidos,
    topProductos,
    productoEstrella,

    // Acciones
    filtrarPorFechas,
    cargarVentas,
  };
});
