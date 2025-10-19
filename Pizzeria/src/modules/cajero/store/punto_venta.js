import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

// 'PuntoDeVenta' es el ID único de este store
export const usePuntoDeVentaStore = defineStore('PuntoDeVenta', () => {
    
    // --- STATE (El Estado o los Datos) ---
    // Aquí guardamos los datos que antes estaban en el componente.
    const menu = ref({
        pizzas: [
            { id: 1, nombre: 'Pepperoni', precio: 150.00 },
            { id: 2, nombre: 'Hawaiana', precio: 160.00 },
            { id: 3, nombre: 'Mexicana', precio: 170.00 },
            { id: 4, nombre: 'Cuatro Quesos', precio: 165.00 },
        ],
        bebidas: [
            { id: 10, nombre: 'Refresco 600ml', precio: 25.00 },
            { id: 11, nombre: 'Agua Fresca 1L', precio: 30.00 },
            { id: 12, nombre: 'Jugo', precio: 20.00 },
        ],
        extras: [],
    });
    
    const ordenActual = ref([]);
    const categoriaActiva = ref('pizzas');

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
        ordenActual.value = []; // Simplemente vaciamos el arreglo
    }

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
    };
});