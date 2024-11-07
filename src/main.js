import { createApp } from 'vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import App from './App.vue';
import store from './store';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'sweetalert2/dist/sweetalert2.min.css';
import i18n from '@/plugins/i18n';

import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fab, fas, far);

const app = createApp(App);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(store);
app.use(router);
app.use(vuetify);
app.use(i18n);
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');
