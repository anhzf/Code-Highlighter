import highlighterService from '@/services/highlighter';
import { LoadingBar } from 'quasar';

export default {
    namespaced: true,

    state() {
        return {
            name: null,
            id: null,
            meta: null,
        };
    },

    mutations: {
        updateAuthState(state, val) {
            ({
                name: state.name,
                id: state.id,
                ...state.meta
            } = val);
        },

        resetUser(state) {
            state.name = null;
            state.id = null;
            state.meta = null;
        },
    },

    actions: {
        async authenticate(context, userName) {
            LoadingBar.start();
            try {
                const res = await highlighterService.login(userName);

                context.commit('updateAuthState', res);
                context.commit('pushNotificationMessage', `Logged in as ${res.name}!`, { root: true });
            } catch (err) {
                context.commit('pushNotificationMessage', err, { root: true });
            }
            LoadingBar.stop();
        },

        logout(context) {
            LoadingBar.start();
            context.commit('resetUser');
            LoadingBar.stop();
        },
    },
};
