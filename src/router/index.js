import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RoomsCatalog from '@/views/RoomsCatalog.vue';
import ContactUs from '@/views/ContactUs.vue';
import AuthorizeIn from '@/views/AuthorizeIn.vue';
import UserBusket from '@/views/UserBusket.vue';
import ReservationPage from '@/views/ReservationPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: RoomsCatalog,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactUs,
  },
  {
    path: '/authorize',
    name: 'Authorize',
    component: AuthorizeIn,
  },
  {
    path: '/userbusket',
    name: 'userbusket',
    component: UserBusket,
  },
  {
    path: '/reserve/:id',
    name: 'ReservationPage',
    component: ReservationPage,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
