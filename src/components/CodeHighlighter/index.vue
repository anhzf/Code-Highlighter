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
import { LoadingBar } from 'quasar';

export default {
    name: 'CodeHighlighter',

    data() {
        return {
            rendered: '',
            debounced: debounceWithPromise(this.post2Server, 300),
        };
    },

    computed: {
        codeInput() {
            return this.$store.state.highlighter.codeInput;
        },
        codeConfig() {
            return {
                lang: this.$store.state.highlighter.lang,
                fileName: this.$store.state.highlighter.fileName,
                twoslash: this.$store.state.highlighter.twoslash,
                highlight: this.$store.state.highlighter.highlight,
            };
        },
    },

    methods: {
        async post2Server() {
            LoadingBar.start();
            if (this.codeInput) {
                const reqBody = { code: this.codeInput };
                const reqConfig = this.codeConfig;
                const res = await highlighterService.post('/', reqBody, reqConfig);

                this.rendered = res.data;
            }
            LoadingBar.stop();
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
