<script setup lang="ts">
import { roomStore } from '@/stores/Room.Stores';
import { useRouter } from 'vue-router';
import RoomList from '@/components/Room/RoomList.vue';
import { Button } from '@/components/ui/button';
import { onMounted } from 'vue';

const router = useRouter();
const store = roomStore();

onMounted(async () => {
  await store.fetchRooms();
});

const handleEdit = (id: number) => {
  router.push(`/room/form/${id}`);
};

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure to delete?")) return;
  await store.deleteRoom(id);
  await store.fetchRooms();
};

const goToForm = () => {
  router.push('/room/form');
};

const goToBin = () => {
  router.push('/room/bin');
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <Button @click="goToForm" variant="default">Add Room</Button>
      <Button @click="goToBin" variant="outline">Bin Room</Button>
    </div>

    <div class="mt-4 bg-white p-4 rounded shadow">
      <RoomList
        :rooms="store.rooms"
        @delete="handleDelete"
        @edit="handleEdit"
      />
    </div>
  </div>
</template>