<script setup lang="ts">
import { categoryStore } from '@/stores/Category.Stores';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import CategoryBin from '@/components/Category/CategoryBin.vue';
import { Button } from '@/components/ui/button';
const store = categoryStore();
const router = useRouter();

onMounted(() => {
  store.fetchBinCategories();
});


const handleRestore = async (id: number) => {
  if (!confirm('Are you sure you want to restore this category?')) return;
  try {
    await store.restoreCategory(id);
    console.log('restored successfully');
  } catch (err: any) {
    console.error(err);
  }
  await store.fetchBinCategories();
};

const handleDelete = async (id: number) => {
  if (!confirm('Are you sure you want to delete permanently this category?')) return;
  try {
    await store.forceDeleteCategory(id);
    console.log('Deleted permanently');
  } catch (err: any) {
    console.error(err);
  }
  await store.fetchBinCategories();
};

const goBack = () => router.push('/category');
</script>


<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <Button @click="goBack" variant="outline">Back</Button>
    </div>

    <div class="mt-4 bg-white p-4 rounded shadow">
      <CategoryBin
      :bin-categories="store.binCategories"
      @restore="handleRestore"
      @forceDelete="handleDelete"
    />
    </div>
  </div>
</template>
