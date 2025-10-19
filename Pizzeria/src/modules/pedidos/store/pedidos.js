import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const usePedidosStore = defineStore('pedidos', () => {

    // --- STATE (Datos) ---
    // En una aplicación real, esta lista vendría de la base de datos en tiempo real.
    const pedidos = ref([
        { id: 101, cliente: 'Angel Ramirez', estado: 'Nuevo', items: ['1x Pizza Hawaiana', '2x Refresco'] },
        { id: 102, cliente: 'Maria Lopez', estado: 'Nuevo', items: ['1x Pizza Pepperoni', '1x Pizza Mexicana'] },
        { id: 103, cliente: 'Carlos Ruiz', estado: 'En Preparación', items: ['1x Pizza 4 Quesos'] },
        { id: 104, cliente: 'Ana Torres', estado: 'Listo', items: ['2x Pizza Hawaiana', '4x Refresco'] },
    ]);

    // --- GETTERS (Datos calculados que filtran la lista principal) ---
    const nuevosPedidos = computed(() => pedidos.value.filter(p => p.estado === 'Nuevo'));
    const pedidosEnPreparacion = computed(() => pedidos.value.filter(p => p.estado === 'En Preparación'));
    const pedidosListos = computed(() => pedidos.value.filter(p => p.estado === 'Listo'));

    // --- ACTIONS (Funciones para modificar los datos) ---
    function moverAPreparacion(idPedido) {
        const pedido = pedidos.value.find(p => p.id === idPedido);
        if (pedido) {
            pedido.estado = 'En Preparación';
        }
    }

    function moverAListo(idPedido) {
        const pedido = pedidos.value.find(p => p.id === idPedido);
        if (pedido) {
            pedido.estado = 'Listo';
        }
    }

    function completarPedido(idPedido) {
        // Elimina el pedido de la lista una vez entregado.
        pedidos.value = pedidos.value.filter(p => p.id !== idPedido);
    }

    return {
        pedidos,
        nuevosPedidos,
        pedidosEnPreparacion,
        pedidosListos,
        moverAPreparacion,
        moverAListo,
        completarPedido,
    };
});