<template>
  <div class="flex">
    <SideBar @update:collapsed="handleCollapse" />

    <main
      :class="[
        'flex-1 p-6 bg-gray-100 min-h-screen transition-all duration-300',
        collapsed ? 'ml-16' : 'ml-64',
      ]"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SideBar from "../components/SideBar.vue";

const collapsed = ref(false);

const handleCollapse = (value) => {
  collapsed.value = value;
};
</script>
