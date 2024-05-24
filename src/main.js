import './main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
axios.defaults.withCredentials = true;

import router from './router.js'

createApp(App).use(router).mount('#app');