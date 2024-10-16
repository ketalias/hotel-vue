import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import RoomsCatalog from '@/views/RoomsCatalog.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: RoomsCatalog,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
