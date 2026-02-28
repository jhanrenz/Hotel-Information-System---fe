<script setup lang="ts">
import type { Category } from '@/types/Category.Types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const props = defineProps<{
  categories: Category[];
}>();

const emits = defineEmits<{
  (e: 'edit', id: number): void;
  (e: 'delete', id: number): void;
}>();

const editData = (id: number) => emits('edit', id);
const deleteData = (id: number) => emits('delete', id);
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
      <TableRow v-for="category in props.categories" :key="category.id">
        <TableCell>{{ category.id }}</TableCell>
        <TableCell>{{ category.name }}</TableCell>
        <TableCell class="flex gap-2 justify-end">
          <Button size="sm" variant="outline" @click="editData(category.id)">Edit</Button>
          <Button size="sm" variant="destructive" @click="deleteData(category.id)">Delete</Button>
        </TableCell>
      </TableRow>
    </TableBody>

    <TableRow>
      <TableCell colspan="2" class="font-medium">Total Categories</TableCell>
      <TableCell class="font-medium text-right">{{ props.categories.length }}</TableCell>
    </TableRow>
  </Table>
</template>