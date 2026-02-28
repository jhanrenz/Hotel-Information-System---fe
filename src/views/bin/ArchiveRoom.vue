<script setup lang="ts">
import { roomStore } from '@/stores/Room.Stores';
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import { onMounted } from 'vue';
import RoomBin from '@/components/Room/RoomBin.vue';

const router = useRouter();
const store = roomStore();

onMounted(async () => {
  await store.fetchBinRooms();
});

const handleRestore = async (id: number) => {
  if (!confirm("Are you sure to restore?")) return;
  await store.restoreRoom(id);
  await store.fetchRooms();
  router.push('/room');
};

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure to delete permanently?")) return;
  await store.forceDeleteRoom(id);
  await store.fetchBinRooms();
};

const goToRoom = () => {
  router.push('/room');
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <Button @click="goToRoom" variant="outline">Back</Button>
    </div>

    <div class="mt-4 bg-white p-4 rounded shadow">
      <RoomBin
        :bin-rooms="store.binRooms"
        @force-delete="handleDelete"
        @restore="handleRestore"
      />
    </div>
  </div>
</template>