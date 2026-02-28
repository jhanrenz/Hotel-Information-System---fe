<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import { onMounted } from 'vue';
import { clientStore } from '@/stores/Client.Stores';
import Clientbin from '@/components/Client/Clientbin.vue';

const router = useRouter();
const store = clientStore();

onMounted(async () => {
  await store.fetchBinClients();
});

const handleRestore = async (id: number) => {
  if (!confirm("Are you sure to restore?")) return;
  await store.restoreClient(id);
  await store.fetchClients();
  router.push('/clients');
};

const handleDelete = async (id: number) => {
  if (!confirm("Are you sure to delete permanently?")) return;
  await store.forceDeleteClient(id);
  await store.fetchBinClients();
};

const goToClient = () => {
  router.push('/client');
};
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <Button @click="goToClient" variant="outline">Back</Button>
    </div>

    <div class="mt-4 bg-white p-4 rounded shadow">
      <Clientbin
        :bin-clients="store.binClients"
        @force-delete="handleDelete"
        @restore="handleRestore"
      />
    </div>
  </div>
</template>