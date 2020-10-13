<template>
    <div class="row">
        <div class="col">
            <code-editor />
        </div>
        <div class="col q-pa-md">
            <div v-html="rendered" />
        </div>
    </div>
</template>

<script>
import highlighterService from '@/services/highlighter';
import componentLoading from '@/components/componentLoading';
import { debounceWithPromise } from '@/utils';
import '@/styles/_shiki-highlighter.scss';

export default {
    name: 'CodeHighlighter',

    data() {
        return {
            rendered: '',
            debounced: debounceWithPromise(this.post2Server, 1000),
        };
    },

    computed: {
        codeInput() {
            return this.$store.state.highlighter.codeInput;
        },
        codeConfig() {
            return this.$store.state.highlighter.ops;
        },
    },

    methods: {
        async post2Server() {
            const reqBody = { code: this.codeInput };
            const reqConfig = this.$store.state.highlighter.ops;
            const res = await highlighterService.post('/', reqBody, reqConfig);

            this.rendered = res.data;
        },
    },

    watch: {
        codeInput() {
            this.debounced();
        },
        codeConfig() {
            this.debounced();
        },
    },

    components: {
        CodeEditor: () => ({
            component: import('./CodeEditor'),
            loading: componentLoading,
        }),
    },
};
</script>