<template>
    <div class="row">
        <div class="col-md col-12">
            <code-editor />
        </div>

        <div class="col-md col-12 q-pa-md column items-center">
            <div
                v-html="rendered"
                class="self-stretch"
            />

            <q-btn
                v-if="rendered"
                icon="get_app"
                color="primary"
                @click="downloadCode"
            >
                download PNG
            </q-btn>
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
            if (this.codeInput) {
                LoadingBar.start();
                try {
                    this.rendered = await highlighterService.highlightCode(this.codeConfig, this.codeInput);
                } catch (errors) {
                    errors.forEach((err) => this.$store.commit('pushNotificationMessage', err.message));
                }
                LoadingBar.stop();
            }
        },

        async downloadCode() {
            if (this.codeInput) {
                LoadingBar.start();
                try {
                    const res = await highlighterService.getPNG(this.codeConfig, this.codeInput);
                    const blob = await res.blob();
                    const virtualAnchor = document.createElement('A');

                    virtualAnchor.href = URL.createObjectURL(blob);
                    virtualAnchor.target = '_blank';
                    virtualAnchor.download = 'code';

                    virtualAnchor.click();
                } catch (errors) {
                    errors.forEach((err) => this.$store.commit('pushNotificationMessage', err.message));
                }
                LoadingBar.stop();
            }
        },
    },

    watch: {
        codeInput: {
            immediate: true,
            handler() {
                this.debounced();
            },
        },
        codeConfig: {
            immediate: true,
            handler() {
                this.debounced();
            },
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
