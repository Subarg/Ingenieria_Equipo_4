<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Empleados</h1>

    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar Empleados..."
          v-model="busqueda"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          @click="editar(null)"
        >
          <FontAwesomeIcon :icon="['fas', 'plus']" class="text-lg" />
        </button>
      </div>
    </div>

    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-gray-100 border-b">
          <tr>
            <th class="px-6 py-3 text-center font-semibold">Nombre</th>
            <th class="px-6 py-3 text-center font-semibold">Apellidos</th>
            <th class="px-6 py-3 text-center font-semibold">Cargo</th>
            <th class="px-6 py-3 text-center font-semibold">
              Fecha de contratación
            </th>
            <th class="px-6 py-3 text-center font-semibold">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in empleadosFiltrados"
            :key="index"
            class="border-b hover:bg-gray-50"
          >
            <td class="px-6 py-3 text-center">{{ item.nombre }}</td>
            <td class="px-6 py-3 text-center">{{ item.apellidos }}</td>
            <td class="px-6 py-3 text-center">{{ item.cargo }}</td>
            <td class="px-6 py-3 text-center">{{ item.fechaContrato }}</td>
            <td class="px-6 py-3 text-center">
              <button
                class="mr-3 p-1 hover:scale-110 transition-transform"
                @click="editar(item)"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'pencil']"
                  class="text-blue-600 text-lg"
                />
              </button>

              <button
                class="p-1 hover:scale-110 transition-transform"
                @click="eliminar(item)"
              >
                <FontAwesomeIcon
                  :icon="['fas', 'trash-can']"
                  class="text-red-600 text-lg"
                />
              </button>
            </td>
          </tr>
          <tr v-if="empleadosFiltrados.length === 0">
            <td colspan="5" class="text-center py-4 text-gray-500">
              No se encontraron empleados
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-if="mostrarModal">
    <agregarEmpleado />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useEmpleadosStore } from "../store/empleados";
import agregarEmpleado from "./agregarEmpleado.vue";

const { busqueda, empleadosFiltrados, empleado, mostrarModal } =
  storeToRefs(useEmpleadosStore());

const { editar, eliminar } = useEmpleadosStore();
</script>
