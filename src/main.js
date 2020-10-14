import overlay from '@/components/overlay';

import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './quasar';

Vue.config.productionTip = false;

Vue.component('c-overlay', overlay);

new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
