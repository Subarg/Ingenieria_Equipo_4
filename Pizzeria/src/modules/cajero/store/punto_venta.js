import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "../../../Router";
import axios from "axios";
// 'PuntoDeVenta' es el ID único de este store
export const usePuntoDeVentaStore = defineStore("PuntoDeVenta", () => {
  // --- STATE (El Estado o los Datos) ---
  // Aquí guardamos los datos que antes estaban en el componente.
  const menu = ref({
    pizzas: [],
    bebidas: [],
    extras: [],
  });

  const ordenActual = ref([]);
  const categoriaActiva = ref("pizzas");
  const pedido = ref({
    nombreCliente: "",
    numOrden: 0,
    metodoPago: "",
    orden: [],
    total: 0,
    venta: {
      tipo_venta: "",
      lugar: "",
    },
  });

  // --- GETTERS (Datos Calculados) ---
  // Son como las propiedades `computed` que teníamos.
  const totalOrden = computed(() => {
    return ordenActual.value.reduce((sum, item) => sum + item.precio, 0);
  });

  // --- ACTIONS (Las Funciones) ---
  // Son las funciones que modifican el estado.
  function agregarAOrden(producto) {
    ordenActual.value.push(producto);
  }

  function quitarDeOrden(index) {
    ordenActual.value.splice(index, 1);
  }

  function cambiarCategoria(categoria) {
    categoriaActiva.value = categoria;
  }

  function cancelarOrden() {
    ordenActual.value = [];
    router.push({ name: "pos" });
  }
  function realizarVenta() {
    router.push({ name: "venta" });
    pedido.value.total = totalOrden.value;
    pedido.value.orden = ordenActual.value;
    console.log(pedido.value);
  }
  const obtenerMenu = async () => {
    try {
      const response = await axios.get("/get-menu");
      menu.value.pizzas = response.data.productos.Pizza;
      menu.value.bebidas = response.data.productos.Refresco;
      menu.value.pizzas.forEach((pizza) => {
        pizza.precio = parseFloat(pizza.precio);
      });
      menu.value.bebidas.forEach((bebida) => {
        bebida.precio = parseFloat(bebida.precio);
      });
    } catch (error) {
      console.error("Error al obtener el menú:", error);
    }
  };
  obtenerMenu();
  // Finalmente, retornamos todo para que los componentes puedan usarlo.
  return {
    menu,
    ordenActual,
    categoriaActiva,
    totalOrden,
    agregarAOrden,
    quitarDeOrden,
    cambiarCategoria,
    cancelarOrden,
    pedido,
    realizarVenta,
    obtenerMenu,
  };
});
