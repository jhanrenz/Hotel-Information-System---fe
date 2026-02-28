import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Login from "./views/auth/Login.vue";
import Register from "./views/auth/Register.vue";
import Dashboard from "./views/pages/Dashboard.vue";
import Category from "./views/pages/Category.vue";
import Client from "./views/pages/Client.vue";
import Room from "./views/pages/Room.vue";
import CategoryBin from "./views/bin/ArchiveCategory.vue";
import ClientBin from "./views/bin/ArchiveClient.vue";
import RoomBin from "./views/bin/ArchiveRoom.vue";
import CategoryForm from "./components/Category/CategoryForm.vue";
import ClientForm from "./components/Client/ClientForm.vue";
import RoomForm from "./components/Room/RoomForm.vue";



const routes : RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {requiresAuth : true}
    },
    
    {
        path: '/category',
        name: 'Category',
        component: Category,
        meta: {requiresAuth : true}
    },
    {
        path: '/category/bin',
        name: 'Category Bin',
        component: CategoryBin,
        meta: {requiresAuth : true}
    },
    {
        path: '/category/form',
        name: 'Add Category',
        component: CategoryForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/category/form/:id?',
        name: 'Update Category',
        component: CategoryForm,
        meta: {requiresAuth : true}
    },


    {
        path: '/client',
        name: 'Client',
        component: Client,
        meta: {requiresAuth : true}
    },
    {
        path: '/client/bin',
        name: 'Client Bin',
        component: ClientBin,
        meta: {requiresAuth : true}
    },
    {
        path: '/client/form',
        name: 'Add Client',
        component: ClientForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/client/form/:id?',
        name: 'Update Client',
        component: ClientForm,
        meta: {requiresAuth : true}
    },

    {
        path: '/room',
        name: 'Room',
        component: Room,
        meta: {requiresAuth : true}
    },
    {
        path: '/room/bin',
        name: 'Room Bin',
        component: RoomBin,
        meta: {requiresAuth : true}
    },
    {
        path: '/room/form',
        name: 'Add Room',
        component: RoomForm,
        meta: {requiresAuth : true}
    },
    {
        path: '/room/form/:id?',
        name: 'Update Room',
        component: RoomForm,
        meta: {requiresAuth : true}
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to)=>{
    const token = localStorage.getItem('token');
    if(to.meta.requiresAuth && ! token){
        return {name : 'Login'};
    }
    return true;
})

export default router;