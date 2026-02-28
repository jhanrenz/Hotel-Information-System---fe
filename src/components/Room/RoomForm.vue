<script setup lang="ts">
import { categoryStore } from '@/stores/Category.Stores';
import { roomStore } from '@/stores/Room.Stores';
import type { Room } from '@/types/Room.Types';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const store = roomStore();
const selectCategory = categoryStore();
const route = useRoute();
const router = useRouter();
const roomId = Number(route.params.id) || null;

const data = ref<Omit<Room, 'id'>>({
  name: '',
  description: '',
  category_id: 0,
  price: 0
});

onMounted(() => {
  store.fetchRooms();
  selectCategory.fetchCategories();
  if (roomId) {
    const room = store.rooms.find(r => r.id === roomId);
    if (room) {
      data.value = {
        name: room.name,
        description: room.description,
        price: room.price,
        category_id: room.category_id
      };
    }
  }
});

const submitData = async () => {
  if (!confirm("Are you sure to save?")) return;
  if (roomId) {
    await store.updateRoom({ id: roomId, ...data.value });
  } else {
    await store.addRoom(data.value);
  }
  router.push('/room');
};

const goBack = () => {
    router.push('/room')
}
</script>

<template>
  <form @submit.prevent="submitData" class="flex flex-col gap-4 max-w-md mx-auto p-4 bg-white rounded-md shadow-sm">
    <Input v-model="data.name" type="text" placeholder="Name" required label="Room Name" />
    <Input v-model="data.description" type="text" placeholder="Description" required label="Description" />
    <Input v-model="data.price" type="number" placeholder="Price" required label="Price" />

    <Select v-model="data.category_id">
      <SelectTrigger>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          v-for="category in selectCategory.categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </SelectItem>
      </SelectContent>
    </Select>
    <div class="flex gap-2 justify-end">
         <Button type="submit" class="mt-2">Save</Button>
         <Button @click="goBack" variant="outline" class="mt-2">Cancel</Button>
    </div>
   
  </form>
</template>