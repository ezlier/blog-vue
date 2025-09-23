import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/fonts/fonts.css'
import { createPinia } from 'pinia'
import router from './router' 

import { useThemeStore } from './stores/theme'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

const themeStore = useThemeStore();
themeStore.initTheme();

app.mount('#app')