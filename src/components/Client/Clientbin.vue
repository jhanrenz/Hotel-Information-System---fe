<script setup lang="ts">
import type { Client } from '@/types/Client.Types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const props = defineProps<{
  binClients: Client[];
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
        <TableHead>Email</TableHead>
        <TableHead>Address</TableHead>
        <TableHead>Room</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="bin in props.binClients" :key="bin.id">
        <TableCell>{{ bin.id }}</TableCell>
        <TableCell>{{ bin.name }}</TableCell>
        <TableCell>{{ bin.email }}</TableCell>
        <TableCell>{{ bin.address }}</TableCell>
        <TableCell>{{ bin.room?.name }}</TableCell>
        <TableCell>Php {{ bin.room?.price }}</TableCell>
        <TableCell class="flex gap-2">
          <Button size="sm" variant="outline" @click="restoreData(bin.id)">Restore</Button>
          <Button size="sm" variant="destructive" @click="forceDeleteData(bin.id)">Delete</Button>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>