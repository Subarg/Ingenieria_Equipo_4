<template>
  <div class="flex">
    <aside
      :class="[
        'bg-gray-800 text-white h-screen fixed top-0 left-0 z-50 flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
      ]"
    >
      <div class="flex flex-col items-center p-4">
        <button
          @click="mostrarSideBar"
          class="mb-6 p-2 rounded hover:bg-gray-700 transition"
        >
          <FontAwesomeIcon
            :icon="['fas', 'bars']"
            style="color: white"
            class="text-2xl"
          />
        </button>

        <div
          v-if="!collapsed"
          class="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-lg mb-3"
        >
          <FontAwesomeIcon
            :icon="['fas', 'user']"
            class="text-white text-4xl"
          />
        </div>
        <h2 v-if="!collapsed" class="text-xl font-semibold mb-6">Usuario</h2>
        <h2 v-else>
          <FontAwesomeIcon
            :icon="['fas', 'circle-user']"
            class="text-white text-2xl mb-6"
          />
        </h2>

        <ul class="w-full" v-if="!collapsed">
          <li
            class="mb-2 w-full text-lg"
            v-for="menu in menus"
            :key="menu.nombre"
          >
            <div v-if="rol == 1 || rol == menu.rol_id">
              <button
                @click="mostrarMenu(menu.nombre)"
                class="flex items-center justify-between w-full gap-2"
              >
                <div class="flex items-center gap-2">
                  <i>
                    <FontAwesomeIcon
                      :icon="['fas', menu.icon]"
                      style="color: white"
                      class="text-xl"
                    />
                  </i>
                  {{ menu.nombre }}
                </div>

                <FontAwesomeIcon
                  v-if="openMenu === menu.nombre"
                  :icon="['fas', 'caret-down']"
                  style="color: white"
                />
                <FontAwesomeIcon
                  v-else
                  :icon="['fas', 'caret-left']"
                  style="color: white"
                />
              </button>
            </div>
            <div v-if="openMenu === menu.nombre" class="ml-6 mt-1">
              <ul>
                <li
                  v-for="vista in menu.vistas"
                  :key="vista.nombre"
                  class="px-2 py-1 rounded hover:bg-blue-500 cursor-pointer text-base"
                >
                  <router-link :to="vista.path">
                    {{ vista.nombre }}
                  </router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <ul v-else>
          <li class="mb-3 w-full" v-for="menu in menus">
            <div v-if="rol == 1 || rol == menu.rol_id">
              <i>
                <FontAwesomeIcon
                  :icon="['fas', menu.icon]"
                  style="color: white"
                  class="text-2xl"
                />
              </i>
            </div>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "../modules/login/store/login";
import { storeToRefs } from "pinia";
const router = useRouter();
const { usuario, rol } = storeToRefs(useLoginStore());
const collapsed = ref(false);

const openMenu = ref(null);
onMounted(() => {
  rol.value = localStorage.getItem("rol_id");
});
function mostrarMenu(menu) {
  openMenu.value = openMenu.value === menu ? null : menu;
}
const emit = defineEmits(["update:collapsed"]);

const mostrarSideBar = () => {
  collapsed.value = !collapsed.value;
  emit("update:collapsed", collapsed.value);
};

const menus = [
  {
    nombre: "Administrador",
    icon: "user-tie",
    rol: "admin",
    rol_id: 1,
    vistas: [
      { nombre: "Almacen", path: "/almacen" },
      { nombre: "Pizzas", path: "/pizzas" },
      { nombre: "Reporte Productos", path: "/reporte-compras" },
      { nombre: "Dashboard Ventas", path: "" },
      { nombre: "Dashboard Ventas X Pizza", path: "/dashboard-ventas" },
      { nombre: "Dashboard Pizzas", path: "" },
      { nombre: "Empleados", path: "/empleados" },
    ],
  },
  {
    nombre: "Caja",
    icon: "cash-register",
    rol: "cajero",
    rol_id: 2,
    vistas: [{ nombre: "Punto de venta", path: "/pos" }],
  },
  {
    nombre: "Pedidos",
    icon: "pizza-slice",
    rol: "chef",
    rol_id: 3,
    vistas: [{ nombre: "Pedidos Siguientes", path: "/pedidos" }],
  },
  {
    nombre: "Almacen",
    icon: "box",
    rol: "almacenista",
    rol_id: 4,
    vistas: [{ nombre: "Insumos", path: "" }],
  },
];
</script>
