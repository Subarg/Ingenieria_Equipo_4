<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside
      :class="[
        'bg-gray-800 text-white h-screen fixed top-0 left-0 z-50 flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      ]"
    >
      <div class="flex flex-col items-center p-4">
        <button
          @click="toggleSidebar"
          class="mb-6 p-2 rounded hover:bg-gray-700 transition"
        >
          <span v-if="collapsed">☰</span>
          <span v-else>✕</span>
        </button>

        <div
          v-if="!collapsed"
          class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg mb-3"
        >
          <span class="text-white text-3xl">EA</span>
        </div>
        <h2 v-if="!collapsed" class="text-lg font-semibold mb-6">
          Eber Aldair
        </h2>

        <ul class="w-full">
          <li
            v-for="item in menu"
            :key="item.text"
            class="flex items-center mb-3 px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer transition"
            @click="irA(item.path)"
          >
            <span class="mr-2" v-if="!collapsed">{{ item.text }}</span>
            <span v-else>{{ item.text[0] }}</span>
          </li>
        </ul>
      </div>
    </aside>

    <!-- Contenido principal -->
    <main
      :class="[
        'flex-1 transition-all duration-300 p-6 bg-gray-100 min-h-screen',
        collapsed ? 'ml-16' : 'ml-64',
      ]"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const collapsed = ref(false);

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};

const menu = [
  { text: "Administrador", path: "/admin/home" },
  { text: "Caja", path: "/admin/caja" },
  { text: "Almacén", path: "/admin/almacen" },
  { text: "Pedidos", path: "/admin/pedidos" },
];

const irA = (path) => {
  router.push(path);
};
</script>
