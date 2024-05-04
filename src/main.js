import './main.css'

import { createApp } from 'vue'
import App from './App.vue'

import Main from '../src/components/Main.vue'
import Cart from '../src/components/Cart.vue'
import Enter from '../src/components/Enter.vue'
import ProductItem from '../src/components/ProductItem.vue'
import Login from '../src/components/Login.vue'
import Registration from '../src/components/Registration.vue'
import Profile from '../src/components/Profile.vue'

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
    name: 'Enter',
    path: '/Enter',
    component: Enter
  },
  {
    name: 'Product',
    path: '/Product',
    component: ProductItem
  },
  {
    name: 'Profile',
    path: '/Profile',
    component: Profile
  },
  {
    name: 'Login',
    path: '/Login',
    component: Login
  },
  {
    name: 'Registration',
    path: '/Registration',
    component: Registration
  },
],
})

const app = createApp(App);
app.use(router);
app.mount('#app');
