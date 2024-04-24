/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */

import "primevue/resources/themes/aura-light-green/theme.css";
import "primeicons/primeicons.css";
import "./styles/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";

import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import Password from 'primevue/password';

const app = createApp(App);

app.use(PrimeVue, { ripple: true  });

app.component('Password', Password)
app.component('Avatar',Avatar)
app.component('Button', Button);
app.component('Menu', Menu);

app.use(router)

app.mount('#app')
