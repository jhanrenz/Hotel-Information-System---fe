<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { authStore } from "@/stores/Auth.Stores";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-vue-next"; // Lucide icons

const router = useRouter();
const route = useRoute();
const auth = authStore();
const mobileMenuOpen = ref(false);

const handleLogout = async () => {
  if (!confirm("Are you sure you want to logout?")) return;
  await auth.logout();
  router.push("/");
};

const isAuthenticated = computed(() => !!localStorage.getItem("token"));

const navItems = [
  { name: "Dashboard", path: "/dashboard", routeName: "Dashboard" },
  { name: "Categories", path: "/category", routeName: "Category" },
  { name: "Clients", path: "/client", routeName: "Client" },
  { name: "Rooms", path: "/room", routeName: "Room" },
];
</script>

<template>
  <header v-if="isAuthenticated" class="bg-white shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

      <!-- Logo -->
      <RouterLink to="/dashboard" class="text-xl font-semibold text-gray-900 hover:text-gray-700">
        Admin Panel
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-2 ml-10">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150"
          :class="route.name === item.routeName
            ? 'bg-gray-100 text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'"
        >
          {{ item.name }}
        </RouterLink>
      </nav>

      <!-- Right Section -->
      <div class="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          class="hidden md:inline-flex"
          @click="handleLogout"
        >
          Logout
        </Button>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2 rounded-md hover:bg-gray-100" @click="mobileMenuOpen = !mobileMenuOpen">
          <component :is="mobileMenuOpen ? X : Menu" class="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white border-t border-gray-200 shadow-sm">
      <nav class="flex flex-col p-4 gap-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
        </RouterLink>
        <Button variant="outline" size="sm" class="w-full mt-2" @click="handleLogout">
          Logout
        </Button>
      </nav>
    </div>
  </header>
</template>