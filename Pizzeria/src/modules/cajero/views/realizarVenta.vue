<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center p-6">
    <div
      class="w-full max-w-2xl bg-gray-800 text-white rounded-2xl p-8 shadow-lg"
    >
      <h1 class="text-3xl font-bold text-center mb-8">Cobro de Venta</h1>

      <!-- Usamos @submit.prevent para manejar el envío -->
      <form class="space-y-6" @submit.prevent="submitVenta">
        <div>
          <label class="block text-lg font-medium text-gray-300"
            >Nombre del Cliente</label
          >
          <input
            type="text"
            placeholder="Ej: Juan Pérez"
            class="mt-2 w-full bg-gray-700 text-white py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="pedido.nombreCliente"
          />
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-300"
            >Método de Pago</label
          >
          <select
            class="mt-2 w-full bg-gray-700 text-white py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="pedido.metodoPago"
            required
          >
            <option value="" disabled>-- Selecciona un método --</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-300"
            >Resumen de la Orden</label
          >
          <textarea
            rows="4"
            class="mt-2 w-full bg-gray-700 text-white py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="ordenResumen"
            disabled="true"
          ></textarea>
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-300"
            >Tipo de Consumo</label
          >
          <select
            class="mt-2 w-full bg-gray-700 text-white py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="pedido.venta.tipo_venta"
            required
          >
            <option value="" disabled>-- Selecciona una opción --</option>
            <option value="comer_aqui">Para comer aquí</option>
            <option value="domicilio">A domicilio</option>
          </select>
        </div>

        <div v-if="pedido.venta.tipo_venta == 'domicilio'">
          <label class="block text-lg font-medium text-gray-300"
            >Dirección</label
          >
          <input
            type="text"
            placeholder="Ej: Calle Reforma #123, Col. Centro"
            class="mt-2 w-full bg-gray-700 text-white py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            v-model="pedido.venta.lugar"
            :required="pedido.venta.tipo_venta == 'domicilio'"
          />
        </div>

        <div>
          <label class="block text-lg font-medium text-gray-300"
            >Costo Total ($)</label
          >
          <input
            type="number"
            placeholder="Ej: 350.00"
            class="mt-2 w-full bg-gray-700 text-white py-3 px-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled="true"
            v-model="pedido.total"
          />
        </div>

        <div class="flex justify-between mt-10">
          <button
            @click="cancelar"
            type="button"
            class="w-1/2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg text-lg transition-colors mr-4"
          >
            Cancelar
          </button>
          <!-- El botón "Aceptar" ahora es de tipo "submit" -->
          <button
            type="submit"
            class="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition-colors"
          >
            Aceptar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { usePuntoDeVentaStore } from "../store/punto_venta.js";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

// 1. Obtenemos el store y las funciones que necesitamos
const router = useRouter();
const posStore = usePuntoDeVentaStore();
const { pedido } = storeToRefs(posStore);
const { confirmarVenta } = posStore; // <-- ¡La nueva función!

// 2. Creamos un resumen de orden computed
const ordenResumen = computed(() => {
  if (pedido.value.orden && pedido.value.orden.length > 0) {
    return pedido.value.orden.map(p => p.nombre).join("\n");
  }
  return "No hay productos en la orden.";
});

// 3. Función para manejar el envío del formulario
function submitVenta() {
  // Aquí puedes añadir validaciones si quieres
  if (!pedido.value.metodoPago || !pedido.value.venta.tipo_venta) {
    alert("Por favor, completa todos los campos.");
    return;
  }
  // Si todo está bien, llamamos a la acción del store
  confirmarVenta();
}

// 4. Función para cancelar
function cancelar() {
  // No enviamos la venta, solo volvemos al POS
  router.push({ name: "punto_venta" });
}

// 5. Si el usuario recarga esta página, la orden estará vacía.
// Lo redirigimos al POS para que no haya errores.
onMounted(() => {
  if (!pedido.value.orden || pedido.value.orden.length === 0) {
    router.push({ name: "punto_venta" });
  }
});
</script>