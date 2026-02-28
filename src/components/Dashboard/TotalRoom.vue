<script setup lang="ts">
import type { Room } from '@/types/Room.Types';

const props = defineProps<{
  rooms: Room[];
}>();

</script>

<template>
  <div class="text-center">
    <div class="mb-4">
      <span class="text-5xl font-extrabold text-black my-2 block">{{ props.rooms.length }}</span>
    </div>

  </div>
</template>