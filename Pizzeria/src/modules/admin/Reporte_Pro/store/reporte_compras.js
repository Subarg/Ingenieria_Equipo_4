import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useReporteComprasStore = defineStore('ReporteCompras', () => {
    
    // --- STATE (Datos simulados de las compras del día) ---
    const fechaReporte = ref(new Date().toLocaleDateString('es-MX'));
    
    // Estos datos vendrían de tu base de datos en una aplicación real
    const comprasDelDia = ref([
        { id: 1, producto: 'Queso Mozzarella', proveedor: 'Lácteos del Sur', cantidad: 10, precioUnitario: 145.50, unidad: 'kg' },
        { id: 2, producto: 'Salsa de Tomate', proveedor: 'La Huerta Feliz', cantidad: 20, precioUnitario: 45.00, unidad: 'litros' },
        { id: 3, producto: 'Pepperoni', proveedor: 'Embutidos La Fina', cantidad: 5, precioUnitario: 250.00, unidad: 'kg' },
        { id: 4, producto: 'Cajas de Pizza', proveedor: 'Empaques del Centro', cantidad: 200, precioUnitario: 5.50, unidad: 'unidades' },
        { id: 5, producto: 'Refresco Familiar', proveedor: 'Distribuidora Gaseosa', cantidad: 30, precioUnitario: 32.00, unidad: 'unidades' },
    ]);

    // --- GETTERS (Datos calculados) ---

    // Calcula el total por cada línea de compra
    const comprasConTotal = computed(() => {
        return comprasDelDia.value.map(compra => ({
            ...compra,
            total: compra.cantidad * compra.precioUnitario
        }));
    });

    // Calcula la suma total de todas las compras del día
    const granTotalCompras = computed(() => {
        return comprasConTotal.value.reduce((acumulador, item) => acumulador + item.total, 0);
    });

    // --- ACTIONS (Funciones) ---
    function imprimirReporte() {
        window.print();
    }

    return {
        fechaReporte,
        comprasConTotal,
        granTotalCompras,
        imprimirReporte,
    };
});