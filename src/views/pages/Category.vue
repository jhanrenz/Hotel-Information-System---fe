<script setup lang="ts">
import { categoryStore } from '@/stores/Category.Stores';
import CategoryList from '@/components/Category/CategoryList.vue';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { Button } from '@/components/ui/button';

const store = categoryStore();
const router = useRouter();

onMounted(() => {
  store.fetchCategories();
});

const handleEdit = (id: number) => {
  router.push(`/category/form/${id}`);
};

const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete this category?')) return;
  try {
    await store.deleteCategory(id);
    console.log('Deleted successfully');
  } catch (err: any) {
    console.error(err);
  }
  await store.fetchCategories();
};

const goToForm = () => router.push('/category/form');
const goToBin = () => router.push('/category/bin');
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <Button @click="goToForm" variant="default">Add Room</Button>
      <Button @click="goToBin" variant="outline">Bin Room</Button>
    </div>

    <div class="mt-4 bg-white p-4 rounded shadow">
      <CategoryList
      :categories="store.categories"
      @edit="handleEdit"
      @delete="handleDelete"
    />
    </div>
  </div>
</template>

