<script setup lang="ts">
import { clientStore } from '@/stores/Client.Stores';
import { useRouter } from 'vue-router';
import ClientList from '@/components/Client/ClientList.vue';
import { Button } from '@/components/ui/button';
import { onMounted } from 'vue';
const router = useRouter();
const store = clientStore();

onMounted(async()=>{
    store.fetchClients();
})

const handleEdit = (id : number) => {
    router.push(`/client/form/${id}`)
}

const handleDelete = async (id : number) => {
    if(!confirm("Are you sure to delete?")) return;
    await store.deleteClient(id);
    await store.fetchClients();
}

const goToBin = () => {
    router.push('/client/bin')
}

const goToForm = () => {
    router.push('/client/form')
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex gap-2">
      <Button @click="goToForm" variant="default">Add Client</Button>
      <Button @click="goToBin" variant="outline">Bin Client</Button>
    </div>
    <div class="mt-4 bg-white p-4 rounded shadow">
      <ClientList
        :clients="store.clients"
        @delete="handleDelete"
        @edit="handleEdit"
      />
    </div>
  </div>
</template>