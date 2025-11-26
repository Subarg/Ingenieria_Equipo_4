import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useReporteComprasStore = defineStore('ReporteCompras', () => {
    
    const fechaReporte = ref(new Date().toLocaleDateString('es-MX'));
    const comprasDelDia = ref([]); 
    const cargando = ref(false); 

    const comprasConTotal = computed(() => {
        if (!comprasDelDia.value) return [];
        
        return comprasDelDia.value.map(compra => ({
            ...compra,
            total: Number(compra.cantidad) * Number(compra.precioUnitario)
        }));
    });

    const granTotalCompras = computed(() => {
        return comprasConTotal.value.reduce((acumulador, item) => acumulador + item.total, 0);
    });

    // --- ACTIONS ---
    async function cargarComprasDesdeBD() {
        cargando.value = true;
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/reporte-compras-dia');
            
            comprasDelDia.value = response.data.map(item => ({
                id: item.id,
                producto: item.producto,
                proveedor: item.proveedor,
                cantidad: Number(item.cantidad), 
                unidad: item.unidad,
                precioUnitario: Number(item.precio_unitario) 
            }));

        } catch (error) {
            console.error("Error al cargar las compras desde Laravel:", error);
        } finally {
            cargando.value = false;
        }
    }

    function imprimirReporte() {
        window.print();
    }

    return {
        fechaReporte,
        comprasDelDia,
        comprasConTotal,
        granTotalCompras,
        cargando,           
        cargarComprasDesdeBD, 
        imprimirReporte,
    };
});