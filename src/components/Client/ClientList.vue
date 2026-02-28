<script setup lang="ts">
import type { Client } from '@/types/Client.Types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const props = defineProps<{
  clients: Client[];
}>();

const emits = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
}>();

const editData = (id: number) => {
  emits('edit', id);
};

const deleteData = (id: number) => {
  emits('delete', id);
};
</script>

<template>
  <Table class="w-full">
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Email</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>Room</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="client in props.clients" :key="client.id">
        <TableCell>{{ client.id }}</TableCell>
        <TableCell>{{ client.name }}</TableCell>
        <TableCell>{{ client.email }}</TableCell>
        <TableCell>{{ client.address }}</TableCell>
        <TableCell>{{ client.room?.name }}</TableCell>
        <TableCell>Php {{ client.room?.price }}</TableCell>
        <TableCell class="flex gap-2">
          <Button size="sm" variant="outline" @click="editData(client.id)">Edit</Button>
          <Button size="sm" variant="destructive" @click="deleteData(client.id)">Delete</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>