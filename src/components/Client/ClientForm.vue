<script setup lang="ts">
import { clientStore } from '../../stores/Client.Stores';
import { roomStore } from '@/stores/Room.Stores';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Client } from '@/types/Client.Types';

const store = clientStore();
const selectRoom = roomStore();
const route = useRoute();
const router = useRouter();
const clientId = Number(route.params.id) || null;

const data = ref<Omit<Client, 'id'>>({
  name: '',
  email: '',
  address: '',
  room_id: 0
});

onMounted(() => {
  store.fetchClients();
  selectRoom.fetchRooms();
  if (clientId) {
    const client = store.clients.find(c => c.id === clientId);
    if (client) {
      data.value = {
        name: client.name,
        email: client.email,
        address: client.address,
        room_id: client.room_id
      };
    }
  }
});

const submitData = async () => {
  if (!confirm("Are you sure to save?")) return;
  if (clientId) {
    await store.updateClient({ id: clientId, ...data.value });
  } else {
    await store.addClient(data.value);
  }
  router.push('/client');
};

const goBack = () => {
    router.push('/client')
}
</script>

<template>
  <form @submit.prevent="submitData" class="flex flex-col gap-4 max-w-md mx-auto p-4 bg-white rounded-md shadow-sm">
    <Input v-model="data.name" type="text" placeholder="Name" required label="Room Name" />
    <Input v-model="data.email" type="email" placeholder="Email" required label="Email" />
    <Input v-model="data.address" type="text" placeholder="Address" required label="Address" />
    <Select v-model="data.room_id">
      <SelectTrigger>
        <SelectValue placeholder="Select Room" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="room in selectRoom.rooms"
          :key="room.id"
          :value="room.id"
        >
          {{ room.name }}
        </SelectItem>
      </SelectContent>
    </Select>
    <div class="flex gap-2 justify-end">
         <Button type="submit" class="mt-2">Save</Button>
         <Button @click="goBack" variant="outline" class="mt-2">Cancel</Button>
    </div>
   
  </form>
</template>