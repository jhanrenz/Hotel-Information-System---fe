<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from './components/Layout/Navbar.vue';

const route = useRoute();

// Navbar will not show on login and register
const showNavbar = computed(() => {
  const noNavbarRoutes = ["Login", "Register"];
  return !noNavbarRoutes.includes(route.name as string);
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar v-if="showNavbar" />
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>