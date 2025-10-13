import { ref } from "vue";
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", () => {
  const verSideBar = ref(false);

  const mostrarSideBar = () => {
    verSideBar.value = !verSideBar.value;
  };

  return { verSideBar, mostrarSideBar };
});
