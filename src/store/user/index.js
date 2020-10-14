import highlighterService from '@/services/highlighter';

export default {
    namespaced: true,

    state() {
        return {
            user: null,
        };
    },

    mutations: {
        updateAuthState(state, val) {
            state.user = val;
        },
    },

    actions: {
        async authenticate(context, userName) {
            const res = await highlighterService.post('user/register', { name: userName });
            if (res.success) {
                context.commit('updateAuthState', res.data);
            } else {
                context.commit('pushNotificationMessage', res.message, { root: true });
            }
        },
        // authenticate: {
        //     root: true,
        //     async handler(context, userName) {
        //         const res = await highlighterService.post('user/register', { name: userName });
        //         if (res.success) {
        //             context.commit('user/updateAuthState', res.data);
        //         } else {
        //             context.commit('pushNotificationMessage', res.message);
        //         }
        //     },
        // },
    },
};
