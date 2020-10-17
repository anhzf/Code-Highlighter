import auth from '@/services/auth';
import { notify } from '@/utils';
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
                const res = await auth.login(userName);

                context.commit('updateAuthState', res);
                notify(`Logged in as ${res.name}!`);
            } catch (err) {
                notify(err);
            }
            LoadingBar.stop();
        },

        logout(context) {
            LoadingBar.start();
            context.commit('resetUser');
            context.commit('highlighter/resetCollections', null, { root: true });
            LoadingBar.stop();
        },
    },
};
