import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "../../../Router";
import apiClient from "../../../axios";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Importamos el store de cajero para saber el turno actual
import { useCajeroStore } from "./cajero.js";
// Importamos el store de pedidos para actualizar la otra pantalla
import { usePedidosStore } from '../../pedidos/store/pedidos.js'; 

export const usePuntoDeVentaStore = defineStore("PuntoDeVenta", () => {
  // --- STATE ---
  const menu = ref({
    pizzas: [],
    bebidas: [],
    extras: [],
  });

  const ordenActual = ref([]);
  const categoriaActiva = ref("pizzas");
  const pedido = ref({
    nombreCliente: "Cliente General",
    numOrden: 0,
    metodoPago: "efectivo",
    orden: [],
    total: 0,
    venta: {
      tipo_venta: "comer_aqui",
      lugar: "",
    },
  });

  // --- GETTERS ---
  const totalOrden = computed(() => {
    return ordenActual.value.reduce((sum, item) => sum + item.precio, 0);
  });

  // --- ACTIONS ---
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
    // Copiamos la orden al 'pedido' que se usará en la siguiente vista
    pedido.value.total = totalOrden.value;
    pedido.value.orden = ordenActual.value;
    // Reseteamos el nombre del cliente y método de pago para la nueva venta
    pedido.value.nombreCliente = "Cliente General";
    pedido.value.metodoPago = "efectivo";
    pedido.value.venta.tipo_venta = "comer_aqui";
    pedido.value.venta.lugar = "";
    
    router.push({ name: "venta" });
  }

  // --- FUNCIÓN MEJORADA ---
  async function confirmarVenta() {
    const cajeroStore = useCajeroStore();
    
    // MEJORA: Verificamos tanto el turno como el estado turnoActivo
    console.log("Estado del turno:", cajeroStore.turno);
    console.log("Turno activo:", cajeroStore.turnoActivo);
    
    // Verificación mejorada
    if (!cajeroStore.turnoActivo || !cajeroStore.turno.numTurno || cajeroStore.turno.numTurno === 0) {
      Swal.fire({
        icon: "error",
        title: "No hay turno activo",
        text: "Por favor, inicia un turno antes de registrar una venta.",
        confirmButtonText: "OK",
      });
      return;
    }

    // Preparamos el payload
    const payload = {
      nombreCliente: pedido.value.nombreCliente,
      metodoPago: pedido.value.metodoPago,
      total: pedido.value.total,
      tipo_venta: pedido.value.venta.tipo_venta,
      lugar: pedido.value.venta.lugar || "",
      id_turno: cajeroStore.turno.numTurno,
      id_caja: cajeroStore.turno.caja,
      id_user: parseInt(localStorage.getItem("user_id")) || 0,
      // Mapeamos 'orden' para que solo envíe los IDs y la cantidad
      productos: pedido.value.orden.map(item => ({
        id: item.id_producto || item.id,
        cantidad: 1,
        precio_venta: item.precio,
      })),
    };

    console.log("Payload a enviar:", payload);

    try {
      // Usamos un loader mientras se procesa
      Swal.fire({
        title: "Registrando Venta...",
        text: "Por favor espera.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Llamada a la API
      const response = await apiClient.post("/crear-venta", payload);

      Swal.close();

      // Mostramos éxito
      Swal.fire({
        icon: "success",
        title: "¡Venta Registrada!",
        text: `Se ha creado la orden #${response.data.orden_id || response.data.id}`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Actualizamos la pantalla de Pedidos
      try {
        const pedidosStore = usePedidosStore();
        if (response.data.nueva_orden) {
          pedidosStore.agregarNuevoPedido(response.data.nueva_orden);
        } else {
          console.warn("Respuesta de /crear-venta no incluyó 'nueva_orden'.");
        }
      } catch (e) {
        console.error("Error al actualizar el store de pedidos:", e);
      }

      // Reseteamos la orden y volvemos al POS
      ordenActual.value = [];
      router.push({ name: "pos" });

    } catch (error) {
      console.error("Error al confirmar la venta:", error);
      console.error("Detalles:", error.response?.data);
      
      let errorMessage = "No se pudo registrar la venta.";
      
      if (error.response?.status === 500) {
        errorMessage = "Error en el servidor. Verifica que la ruta /api/crear-venta exista en Laravel y que el VentaController esté configurado correctamente.";
      } else if (error.response?.status === 404) {
        errorMessage = "Ruta no encontrada. Verifica tu archivo routes/api.php en Laravel.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Swal.fire({
        icon: "error",
        title: "Error al registrar venta",
        html: `
          <p>${errorMessage}</p>
          <br>
          <small>Revisa la consola del navegador para más detalles técnicos.</small>
        `,
      });
    }
  }

  const obtenerMenu = async () => {
    try {
      const response = await apiClient.get("/get-menu");
      
      menu.value.pizzas = response.data.productos.Pizza || [];
      menu.value.bebidas = response.data.productos.Refresco || [];
      
      menu.value.pizzas.forEach((pizza) => {
        pizza.precio = parseFloat(pizza.precio);
      });
      menu.value.bebidas.forEach((bebida) => {
        bebida.precio = parseFloat(bebida.precio);
      });
      
      console.log("Menú cargado:", menu.value);
    } catch (error) {
      console.error("Error al obtener el menú:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cargar el menú de productos.",
      });
    }
  };

  // Carga inicial del menú
  obtenerMenu();

  return {
    menu,
    ordenActual,
    categoriaActiva,
    pedido,
    totalOrden,
    agregarAOrden,
    quitarDeOrden,
    cambiarCategoria,
    cancelarOrden,
    realizarVenta,
    obtenerMenu,
    confirmarVenta,
  };
});