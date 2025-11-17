<template>
  <div class="h-screen flex items-center justify-center bg-gray-100">
    <div class="relative w-80">
      <div
        class="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
      >
        <FontAwesomeIcon :icon="['fas', 'user']" class="text-white text-3xl" />
      </div>

      <form
        @submit.prevent="registrarUsuario"
        class="bg-white pt-14 pb-6 px-6 rounded-lg shadow-md"
      >
        <h1 class="text-2xl font-bold mb-6 text-center">Registrar Usuario</h1>

        <div class="mb-4">
          <label class="block mb-2 font-semibold">Empleado:</label>
          <div class="relative">
            <input
              type="text"
              v-model="busquedaEmpleado"
              @focus="mostrarListaEmpleados = true"
              @input="filtrarEmpleados"
              placeholder="Buscar empleado..."
              class="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              required
            />

            <div
              v-if="mostrarListaEmpleados && empleadosFiltrados.length > 0"
              class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
            >
              <div
                v-for="empleado in empleadosFiltrados"
                :key="empleado.id"
                @click="seleccionarEmpleado(empleado)"
                class="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <div class="font-medium">
                  {{ empleado.nombre }} {{ empleado.apellido_paterno }}
                  {{ empleado.apellido_materno }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ empleado.rol_nombre || "Sin puesto" }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-4">
          <input
            type="text"
            placeholder="Usuario"
            v-model="registro.usuario"
            class="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>

        <div class="mb-6 relative">
          <input
            :type="mostrarContraseña ? 'text' : 'password'"
            placeholder="Contraseña"
            v-model="registro.contrasena"
            class="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 pr-10"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block mb-2 font-semibold">Rol:</label>
          <select
            v-model="registro.rol_id"
            class="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
            :disabled="true"
          >
            <option disabled value="">Selecciona un rol</option>
            <option :value="1">Administrador</option>
            <option :value="4">Almacenista</option>
            <option :value="3">Chef</option>
            <option :value="2">Cajero</option>
          </select>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
        >
          Registrar Usuario
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../login/store/login";
import { useEmpleadosStore } from "../../admin/empleados/store/empleados";

const { mostrarContraseña, asignarRegistro, registrarUsuario } =
  useLoginStore();
const { registro } = storeToRefs(useLoginStore());

const { getEmpleados } = useEmpleadosStore();
const { empleadosFiltrados } = storeToRefs(useEmpleadosStore());

const busquedaEmpleado = ref("");
const mostrarListaEmpleados = ref(false);
const empleadoSeleccionado = ref(null);

const seleccionarEmpleado = (empleado) => {
  empleadoSeleccionado.value = empleado;
  busquedaEmpleado.value = `${empleado.nombre} ${empleado.apellido_paterno}`;
  mostrarListaEmpleados.value = false;
  registro.value = empleado;
  console.log(registro.value);
};

const filtrarEmpleados = () => {
  mostrarListaEmpleados.value = true;
};

const cerrarLista = (e) => {
  if (!e.target.closest(".relative")) {
    mostrarListaEmpleados.value = false;
  }
};

onMounted(() => {
  getEmpleados();
  document.addEventListener("click", cerrarLista);
});
</script>
