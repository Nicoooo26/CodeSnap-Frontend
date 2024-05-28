/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import 'primevue/resources/themes/saga-blue/theme.css' // Puedes elegir otro tema
import 'primeicons/primeicons.css'
import "./styles/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Sidebar from 'primevue/sidebar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import DialogService from 'primevue/dialogservice'
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Password from 'primevue/password';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const app = createApp(App);

app.use(PrimeVue, { ripple: true  });
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);
app.use(router);

app.component('Toast', Toast);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Button', Button);
app.component('Password', Password);
app.component('DataTable', DataTable);
app.component('InputText', InputText);
app.component('Column', Column);
app.component('ConfirmDialog', ConfirmDialog);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('Sidebar', Sidebar);
app.component('Menu', Menu);
app.component('Avatar', Avatar);

app.mount("#app");
