import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiClient from "../../../axios"; // ¡Importamos apiClient!

export const usePedidosStore = defineStore('pedidos', () => {

    // --- STATE (Datos) ---
    // Ya no usamos datos de prueba, empezamos con un array vacío.
    const pedidos = ref([]);

    // --- GETTERS (Datos calculados que filtran la lista principal) ---
    const nuevosPedidos = computed(() => pedidos.value.filter(p => p.estado === 'Nuevo'));
    const pedidosEnPreparacion = computed(() => pedidos.value.filter(p => p.estado === 'En Preparación'));
    const pedidosListos = computed(() => pedidos.value.filter(p => p.estado === 'Listo'));

    // --- ACTIONS (Funciones para modificar los datos) ---

    // ¡NUEVO! Carga los pedidos desde la API
    async function obtenerPedidos() {
        try {
            // (Asegúrate de tener esta ruta GET /obtener-pedidos en Laravel)
            const response = await apiClient.get('/obtener-pedidos');
            pedidos.value = response.data.pedidos; 
        } catch (error) {
            console.error("Error al cargar los pedidos:", error);
            pedidos.value = []; // En caso de error, vaciamos la lista
        }
    }

    // ¡NUEVO! Añade un nuevo pedido a la lista (llamado desde el POS)
    function agregarNuevoPedido(nuevoPedido) {
        // Asignamos un estado 'Nuevo' por defecto si no viene
        if (!nuevoPedido.estado) {
            nuevoPedido.estado = 'Nuevo';
        }
        pedidos.value.unshift(nuevoPedido); // unshift lo añade al principio
    }

    // Estas funciones ahora deberían llamar a la API para actualizar el estado
    // en la base de datos, y luego actualizar el estado local.

    async function moverAPreparacion(idPedido) {
        const pedido = pedidos.value.find(p => p.id === idPedido);
        if (pedido) {
            try {
                // (Asegúrate de tener esta ruta PUT/POST /actualizar-estado-pedido en Laravel)
                await apiClient.post(`/actualizar-estado-pedido/${idPedido}`, { estado: 'En Preparación' });
                pedido.estado = 'En Preparación'; // Actualiza el estado local
            } catch (error) {
                console.error("Error al mover a preparación:", error);
            }
        }
    }

    async function moverAListo(idPedido) {
        const pedido = pedidos.value.find(p => p.id === idPedido);
        if (pedido) {
            try {
                await apiClient.post(`/actualizar-estado-pedido/${idPedido}`, { estado: 'Listo' });
                pedido.estado = 'Listo'; // Actualiza el estado local
            } catch (error) {
                console.error("Error al mover a listo:", error);
            }
        }
    }

    async function completarPedido(idPedido) {
        try {
            await apiClient.post(`/actualizar-estado-pedido/${idPedido}`, { estado: 'Completado' });
            // Elimina el pedido de la lista una vez entregado.
            pedidos.value = pedidos.value.filter(p => p.id !== idPedido);
        } catch (error) {
            console.error("Error al completar el pedido:", error);
        }
    }

    // --- Carga inicial ---
    // Llama a la función para cargar los pedidos cuando se inicia el store
    obtenerPedidos();

    return {
        pedidos,
        nuevosPedidos,
        pedidosEnPreparacion,
        pedidosListos,
        obtenerPedidos,
        agregarNuevoPedido, // <-- ¡Importante!
        moverAPreparacion,
        moverAListo,
        completarPedido,
    };
});