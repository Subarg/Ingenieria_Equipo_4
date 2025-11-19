import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const usePedidosStore = defineStore("pedidos", () => {
  // --- STATE ---
  const pedidos = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // --- GETTERS ---
  // Filtra por el campo "estado" que viene de tu BD
  const nuevosPedidos = computed(() =>
    pedidos.value.filter((p) => p.estado?.trim().toLowerCase() === "nuevo")
  );

  const pedidosEnPreparacion = computed(() =>
    pedidos.value.filter(
      (p) => p.estado?.trim().toLowerCase() === "en_preparacion"
    )
  );

  const pedidosListos = computed(() =>
    pedidos.value.filter((p) => p.estado?.trim().toLowerCase() === "listo")
  );
  // --- ACTIONS ---

  // Obtener pedidos desde la API
  async function obtenerPedidos() {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get("/obtener-pedidos");
      pedidos.value = response.data.pedidos || response.data;
      console.log("Pedidos cargados:", pedidos.value);
    } catch (err) {
      console.error("Error al cargar los pedidos:", err);
      error.value = "No se pudieron cargar los pedidos";
      pedidos.value = [];
    } finally {
      loading.value = false;
    }
  }

  // Agregar nuevo pedido (desde POS)
  function agregarNuevoPedido(nuevoPedido) {
    const pedido = {
      ...nuevoPedido,
      estado: nuevoPedido.estado || "nuevo",
      detalle: Array.isArray(nuevoPedido.detalle) ? nuevoPedido.detalle : [],
    };
    pedidos.value.unshift(pedido);
  }

  // Actualizar estado de pedido
  async function actualizarEstado(idPedido, nuevoEstado) {
    const pedido = pedidos.value.find((p) => p.id_pedido === idPedido);
    if (!pedido) {
      console.error(`Pedido ${idPedido} no encontrado`);
      return;
    }

    try {
      await axios.post(`/actualizar-estado-pedido/${idPedido}`, {
        estado: nuevoEstado,
        id: idPedido,
      });
      pedido.estado = nuevoEstado;
      console.log(`Pedido ${idPedido} actualizado a: ${nuevoEstado}`);
    } catch (err) {
      console.error(`Error al actualizar a ${nuevoEstado}:`, err);
      throw err;
    }
  }

  // Funciones específicas con los estados correctos de tu BD
  async function moverAPreparacion(idPedido) {
    await actualizarEstado(idPedido, "en_preparacion");
  }

  async function moverAListo(idPedido) {
    await actualizarEstado(idPedido, "listo");
  }

  async function completarPedido(idPedido) {
    await actualizarEstado(idPedido, "completado");
    // Eliminar de la lista local
    pedidos.value = pedidos.value.filter((p) => p.id_pedido !== idPedido);
  }

  // --- Inicialización ---
  obtenerPedidos();

  return {
    // State
    pedidos,
    loading,
    error,

    // Getters
    nuevosPedidos,
    pedidosEnPreparacion,
    pedidosListos,

    // Actions
    obtenerPedidos,
    agregarNuevoPedido,
    moverAPreparacion,
    moverAListo,
    completarPedido,
  };
});
