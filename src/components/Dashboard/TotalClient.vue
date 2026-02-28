<script setup lang="ts">
import type { Client } from '@/types/Client.Types';

const props = defineProps<{
  clients: Client[];
}>();
</script>

<template>
  <div class="text-center">
    <h2 class="text-5xl font-extrabold text-black my-4">{{ props.clients.length }}</h2>
  </div>
</template>