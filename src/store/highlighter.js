export default {
    namespaced: true,

    state() {
        return {
            codeInput: '',
            lang: null,
            fileName: null,
            highlight: null,
            twoslash: null,

            collections: [],
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
        addCollections(state, code) {
            state.collections.push(...code);
        },
        resetCollections(state) {
            state.collections = [];
        },
    },
};
