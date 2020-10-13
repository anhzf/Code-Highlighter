export default {
    namespaced: true,

    state() {
        return {
            codeInput: '',
            ops: {},
        };
    },

    mutations: {
        updateCodeInput(state, val) {
            state.codeInput = val;
        },

        setConfig(state, val) {
            state.ops = val;
        },
    },
};
