import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Login from './login.vue'
import { createRouter, createWebHistory } from 'vue-router'

import './assets/main.css'
import Vue3Toastify from "vue-toastify";
let servers = []
const pinia = createPinia()



const app = createApp(App)
app.use(createPinia())
app.mount('#app')