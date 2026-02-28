import { api } from "@/api";
import type { Register, Login, User } from "@/types/Auth.Types";
import { defineStore } from "pinia";

export const authStore = defineStore('user',{
    state: () => ({
        user : null as User | null,
        token: localStorage.getItem('token') || null,
        loading: false,
    }),

    actions: {
        async register(data : Omit<Register, 'id'>){
            try{
                const response = await api.post('/register', data);
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('token', response.data.token)
            }catch(err : any){
                console.log(err.response.data);
            }
        },

        async login(data : Omit<Login, 'id'>){
            try{
                const response = await api.post('/login', data);
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('token', response.data.token);
            }catch(err: any){
                console.log(err.response.data);
            }
        },

        async logout(){
            try{
                await api.post('/logout');
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.token = null;
                this.user = null;
                localStorage.removeItem('token');
            }
        },
    }
});
