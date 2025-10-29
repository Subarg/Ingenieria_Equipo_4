import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useDashboardVentasStore = defineStore('DashboardVentas', () => {

    // --- STATE (Datos Simulados) ---
    // En un futuro, esto vendría de tu base de datos
    const productosVendidos = ref([
        { id: 1, nombre: 'Pizza Pepperoni', cantidad: 85, precio: 150.00 },
        { id: 2, nombre: 'Pizza Hawaiana', cantidad: 60, precio: 160.00 },
        { id: 3, nombre: 'Refresco 600ml', cantidad: 110, precio: 25.00 },
        { id: 4, nombre: 'Pizza Mexicana', cantidad: 45, precio: 170.00 },
        { id: 5, nombre: 'Pizza 4 Quesos', cantidad: 55, precio: 165.00 },
    ]);

    // --- GETTERS (Datos Calculados) ---

    // 1. Calcula el total de ventas en dinero
    const totalVentasMonetario = computed(() => {
        return productosVendidos.value.reduce((total, p) => total + (p.cantidad * p.precio), 0);
    });

    // 2. Calcula el número total de productos vendidos
    const totalItemsVendidos = computed(() => {
        return productosVendidos.value.reduce((total, p) => total + p.cantidad, 0);
    });

    // 3. Ordena los productos de más a menos vendidos (para el gráfico)
    const topProductos = computed(() => {
        // Hacemos una copia con '...' y la ordenamos
        return [...productosVendidos.value].sort((a, b) => b.cantidad - a.cantidad);
    });

    // 4. Obtiene el producto estrella
    const productoEstrella = computed(() => {
        // El primer item de la lista ya ordenada
        return topProductos.value[0]?.nombre || 'N/A';
    });

    return {
        totalVentasMonetario,
        totalItemsVendidos,
        topProductos,
        productoEstrella
    };
});