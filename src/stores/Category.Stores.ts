import { api } from "@/api";

import type { Category } from "@/types/Category.Types";
import { defineStore } from "pinia";

export const categoryStore = defineStore('categories',{
    state: ()=> ({
        categories: [] as Category[],
        binCategories : [] as Category[],
        loading: false,
    }),

    actions:{
        async fetchCategories()
        {
            this.loading = true;
            try{
                const response = await api.get('/category');
                this.categories = response.data.categories
            }catch(err: any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
        },

        async fetchBinCategories()
        {
            this.loading = true;
            try{
                const response = await api.get('/category?filter=trashed');
                this.binCategories = response.data.categories
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
        },



        async addCategory(category : Omit<Category, 'id'>){
            this.loading = true;
            try{
                const response = await api.post('/category', category);
                this.categories.push(response.data.category);
            }catch(err : any){
                this.loading = false;
            }
        },

        async updateCategory( category : Category ){
            this.loading = true;
            try{
                const response = await api.patch(`/category/${category.id}`,category);
                const index = this.categories.findIndex(c => c.id === category.id);
                this.categories[index] = response.data.category
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false;
            }
        },

        async deleteCategory( id : number){
            this.loading = true;
            try{
                await api.delete(`/category/${id}`);
            }catch(err : any){
                console.log(err.response.data)
            }finally{
                this.loading = false
            }
        },

        async restoreCategory(id : number){
            this.loading = true;
            try{
                await api.patch(`/category/${id}/restore`);
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
        },

        async forceDeleteCategory(id : number){
            this.loading = true;
            try{
                await api.delete(`/category/${id}/force`)
            }catch(err : any){
                console.log(err.response.data);
            }finally{
                this.loading = false;
            }
        },
    }
 
})

