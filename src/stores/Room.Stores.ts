import type { Room } from "@/types/Room.Types";
import { defineStore } from "pinia";
import { api } from "@/api";
export const roomStore = defineStore('rooms',{
    state: () => ({
        rooms: [] as Room[],
        binRooms : [] as Room[],
        loading: false,
    }),

    actions: {
        async fetchRooms(){
            this.loading = true;
            try{
                const response = await api.get('/room');
                this.rooms = response.data.rooms
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false;
            }
        },

        async fetchBinRooms(){
            this.loading = true;
            try{
                const response = await api.get('/room?filter=trashed');
                this.binRooms = response.data.rooms
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false;
            }
        },

        async addRoom(room: Omit<Room,'id'>){
            this.loading = true;
            try{
                const response = await api.post('/room',room);
                this.rooms.push(response.data.room);
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false;
            }
        },

        async updateRoom(room : Room){
            this.loading = true;
            try{
                const response = await api.patch(`/room/${room.id}`,room);
                const index = this.rooms.findIndex(r => r.id === room.id);
                this.rooms[index] = response.data.room;
            }catch(err: any){
                console.log(err.response.data)
            }finally{
                this.loading = false;
            }
        },

        async deleteRoom(id : number){
            try{
                await api.delete(`/room/${id}`)
            }catch(err: any){
                console.log(err.response.data)
            }
        },
        async restoreRoom(id : number){
            try{
                await api.patch(`/room/${id}/restore`)
            }catch(err: any){
                console.log(err.response.data)
            }
        },

        async forceDeleteRoom(id : number){
            try{
                await api.delete(`/room/${id}/force`)
            }catch(err: any){
                console.log(err.response.data)
            }
        },

        
    }
})