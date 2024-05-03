import './main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Main from '../src/components/Main.vue'
import Cart from '../src/components/Cart.vue'
import Profile from '../src/components/Profile.vue'
import ProductItem from '../src/components/ProductItem.vue'

import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [{
    name: 'Main',
    path: '/',
    component: Main
  },
  {
    name: 'Cart',
    path: '/Cart',
    component: Cart
  },
  {
    name: 'Profile',
    path: '/Profile',
    component: Profile
  },
  {
    name: 'Product',
    path: '/Product',
    component: ProductItem
  },
],
})

const app = createApp(App);
app.use(router);
app.mount('#app');
