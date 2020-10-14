import Vue from 'vue';
import Vuex from 'vuex';
// modules
import highlighter from './highlighter';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        notifMessages: [
            'haii, selamat datang di indomaret@',
        ],
    },
    mutations: {
        pushNotificationMessage(state, val) {
            state.notifMessages.push(val);
        },
        delNotificationMessage(state, arrayIndex) {
            state.notifMessages.splice(arrayIndex, 1);
        },
    },
    actions: {
    },
    modules: {
        highlighter, user,
    },
});
