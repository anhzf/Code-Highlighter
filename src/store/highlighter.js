export default {
    namespaced: true,

    state() {
        return {
            codeInput: '',
            lang: null,
            fileName: null,
            highlight: null,
            twoslash: null,
        };
    },

    mutations: {
        updateCodeInput(state, val) {
            state.codeInput = val;
        },
        setLang(state, val) {
            state.lang = val;
        },
        setTwoslash(state, val) {
            state.twoslash = val;
        },
        setFileName(state, val) {
            state.fileName = val;
        },
        setHighlight(state, val) {
            state.highlight = val;
        },
    },
};
