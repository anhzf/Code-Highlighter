import Vue from 'vue';

import './styles/quasar.scss';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import { LoadingBar, Dialog, Quasar } from 'quasar';

Vue.use(Quasar, {
    config: {
        ripple: {
            early: true,
        },
        loadingBar: {
            color: 'primary',
            size: '15px',
            position: 'bottom',
            skipHijack: true,
        },
    },
    components: { /* not needed if importStrategy is not 'manual' */ },
    directives: { /* not needed if importStrategy is not 'manual' */ },
    plugins: {
        LoadingBar, Dialog,
    },
});
