import './styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Lara from './presets/lara';
import Password from 'primevue/password';

const app = createApp(App);
app.use(PrimeVue, { ripple: true , unstyled: true, pt: Lara });
// eslint-disable-next-line vue/multi-word-component-names
app.component('Password', Password);

app.use(router)

app.mount('#app')
