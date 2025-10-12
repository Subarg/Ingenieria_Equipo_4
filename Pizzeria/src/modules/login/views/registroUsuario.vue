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
            v-model="registro.rol"
            class="w-full p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          >
            <option disabled value="">Selecciona un rol</option>
            <option>Administrador</option>
            <option>Almacenista</option>
            <option>Chef</option>
            <option>Cajero</option>
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
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useLoginStore } from "../../login/store/login";

const { mostrarContraseña } = useLoginStore();
const { registro } = storeToRefs(useLoginStore());
</script>
