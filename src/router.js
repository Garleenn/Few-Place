import Main from '../src/components/Main.vue'
import Cart from '../src/components/Cart.vue'
import Enter from '../src/components/Enter.vue'
import ProductItem from '../src/components/ProductItem.vue'
import Login from '../src/components/Login.vue'
import Registration from '../src/components/Registration.vue'
import Profile from '../src/components/Profile.vue'
import CreateProduct from '../src/components/CreateProduct.vue'
import UpdateProfile from '../src/components/UpdateProfile.vue'
import UpdateProduct from '../src/components/UpdateProduct.vue'
import UserReviews from '../src/components/UserReviews.vue'

import { createRouter, createWebHistory } from "vue-router";
export default createRouter({
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
    path: '/Product/:id',
    component: ProductItem
  },
  {
    name: 'Profile',
    path: '/Profile/:login',
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
  {
    name: 'CreateProduct',
    path: '/CreateProduct',
    component: CreateProduct
  },
  {
    name: 'UpdateProfile',
    path: '/UpdateProfile/:login',
    component: UpdateProfile
  },
  {
    name: 'UpdateProduct',
    path: '/UpdateProduct/:id',
    component: UpdateProduct
  },
  {
    name: 'UserReviews',
    path: `/UserReviews/:login`,
    component: UserReviews
  },
],
});