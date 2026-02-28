import { api } from "@/api";
import type { Client } from "@/types/Client.Types";
import { defineStore } from "pinia";

export const clientStore = defineStore('clients',{
     state: ()=> ({
         clients: [] as Client[],
         binClients: [] as Client[],
         loading : false
     }),

     actions:{
         async fetchClients(){
            this.loading = true;
            try{
                const response = await api.get('/client');
                this.clients = response.data.clients;
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
         },

         async fetchBinClients(){
            this.loading = true;
            try{
                const response = await api.get('/client?filter=trashed');
                this.binClients = response.data.clients;
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
         },

         async addClient(client: Omit<Client,'id'>){
            this.loading = true;
            try{
                const response = await api.post('/client', client);
                this.clients.push(response.data.client);
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
         },
        
         async updateClient(client:Client){
            this.loading = true;
            try{
                const response = await api.post(`/client/${client.id}`,client);
                const index = this.clients.findIndex(c => c.id === client.id);
                this.clients[index] = response.data.client;
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
         },
         
         async deleteClient(id : number){
            this.loading = true;
            try{
                await api.delete(`/client/${id}`);
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
         },

         
         async restoreClient(id : number){
            this.loading = true;
            try{
                await api.patch(`/client/${id}/restore`);
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
         },

         
         async forceDeleteClient(id : number){
            this.loading = true;
            try{
                await api.delete(`/client/${id}/force`);
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
         }
         
     }
 })
