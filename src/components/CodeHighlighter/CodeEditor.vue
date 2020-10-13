<template>
    <div
        class="q-pa-md"
        style="height: 70vh;"
    >
        <editor-panel />

        <q-input
            v-model="codeInput"
            type="textarea"
            outlined
            autogrow
            square
            style="max-height: 100%; overflow-y: auto;"
            @keydown.tab.self.prevent="enableTab"
        />
    </div>
</template>

<script>
import supportTab from '@/mixins/supportTab';
import editorPanel from './EditorPanel';

export default {
    name: 'CodeEditor',

    mixins: [supportTab],

    data: () => ({
        indentStyle: '\t',
    }),

    computed: {
        codeInput: {
            get() {
                return this.$store.state.highlighter.codeInput;
            },
            set(val) {
                this.$store.commit('highlighter/updateCodeInput', val);
            },
        },
    },

    components: {
        editorPanel,
    },
};
</script>
