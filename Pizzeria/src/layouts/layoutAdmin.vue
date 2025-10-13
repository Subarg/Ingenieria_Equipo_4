<template>
  <div class="flex">
    <SideBar />

    <main class="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import SideBar from "../components/SideBar.vue";
</script>
