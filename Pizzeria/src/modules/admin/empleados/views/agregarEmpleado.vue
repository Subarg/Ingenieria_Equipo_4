<template>
  <div
    v-if="mostrarModal"
    class="absolute top-0 left-0 w-full flex justify-center items-start z-50 mt-6"
  >
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Registrar Empleado
      </h2>

      <form @submit.prevent="guardarEmpleado" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Empleado</label
          >
          <input
            v-model="empleado.nombre"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Apellidos</label
          >
          <input
            v-model.number="empleado.apellidos"
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Cargo</label>
          <select
            v-model="empleado.cargo"
            class="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">-- Selecciona una cargo--</option>
            <option value="administrador">Administrador</option>
            <option value="chef">Chef</option>
            <option value="cajero">Cajero</option>
            <option value="almacenista">Almacenista</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Fecha de contratación</label
          >
          <input v-model="empleado.fechaContrato" type="date" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </input>
        </div>

    

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
            @click="cerrarModal"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            @click="guardarEmpleado"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
    import { storeToRefs } from "pinia";
    import { useEmpleadosStore } from "../store/empleados";

const { busqueda, empleadosFiltrados, empleado,mostrarModal } =
  storeToRefs(useEmpleadosStore());
const { cerrarModal,guardarEmpleado} =useEmpleadosStore();

</script>
