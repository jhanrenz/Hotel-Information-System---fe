<script setup lang="ts">
import type { Category } from '@/types/Category.Types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const props = defineProps<{
  binCategories: Category[];
}>();

const emits = defineEmits<{
  (e: 'restore', id: number): void;
  (e: 'forceDelete', id: number): void;
}>();

const restoreData = (id: number) => emits('restore', id);
const forceDeleteData = (id: number) => emits('forceDelete', id);
</script>

<template>
  <Table class="w-full">
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Action</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow v-for="bin in props.binCategories" :key="bin.id">
        <TableCell>{{ bin.id }}</TableCell>
        <TableCell>{{ bin.name }}</TableCell>
        <TableCell class="flex gap-2 justify-end">
          <Button size="sm" variant="outline" @click="restoreData(bin.id)">Restore</Button>
          <Button size="sm" variant="destructive" @click="forceDeleteData(bin.id)">Delete</Button>
        </TableCell>
      </TableRow>
    </TableBody>

    <TableRow>
      <TableCell colspan="2" class="font-medium">Total Bin Categories</TableCell>
      <TableCell class="font-medium text-right">{{ props.binCategories.length }}</TableCell>
    </TableRow>
  </Table>
</template>