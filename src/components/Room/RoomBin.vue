<script setup lang="ts">
import type { Room } from '@/types/Room.Types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const props = defineProps<{
  binRooms: Room[];
}>();

const emits = defineEmits<{
  (e: 'restore', id: number): void;
  (e: 'forceDelete', id: number): void;
}>();

const restoreData = (id: number) => {
  emits('restore', id);
};

const forceDeleteData = (id: number) => {
  emits('forceDelete', id);
};
</script>

<template>
  <Table class="w-full">
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Description</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="room in props.binRooms" :key="room.id">
        <TableCell>{{ room.id }}</TableCell>
        <TableCell>{{ room.name }}</TableCell>
        <TableCell>{{ room.description }}</TableCell>
        <TableCell>{{ room.price }}</TableCell>
        <TableCell>{{ room.category?.name || 'N/A' }}</TableCell>
        <TableCell class="flex gap-2">
          <Button size="sm" variant="outline" @click="restoreData(room.id)">Restore</Button>
          <Button size="sm" variant="destructive" @click="forceDeleteData(room.id)">Delete</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>