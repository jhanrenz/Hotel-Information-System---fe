<script setup lang="ts">
import { categoryStore } from '@/stores/Category.Stores';
import type { Category } from '@/types/Category.Types';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const store = categoryStore();
const route = useRoute();
const router = useRouter();
const categoryId = Number(route.params.id) || null;

const data = ref<Omit<Category, 'id'>>({ name: '' });

onMounted(() => {
  store.fetchCategories();
  if (categoryId) {
    const category = store.categories.find(c => c.id === categoryId);
    if (category) {
      data.value = { name: category.name };
    }
  }
});

const submitData = async () => {
  if (!confirm('Are you sure to save?')) return;

  if (categoryId) {
    await store.updateCategory({ id: categoryId, ...data.value });
  } else {
    await store.addCategory(data.value);
  }
  router.push('/category');
};

const goBack = () => {
  router.push('/category');
};
</script>

<template>
  <form 
    @submit.prevent="submitData" 
    class="flex flex-col gap-4 max-w-md mx-auto p-6 bg-white rounded-md shadow-md"
  >
    <Input 
      v-model="data.name" 
      type="text" 
      placeholder="Enter category name" 
      required 
      label="Category Name" 
    />

    <div class="flex gap-2 justify-end">
      <Button type="button" variant="secondary" @click="goBack">
        Cancel
      </Button>
      <Button type="submit">Save</Button>
    </div>
  </form>
</template>