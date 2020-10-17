<template>
    <div class="row">
        <div class="col-md col-12">
            <code-editor />
        </div>

        <div class="col-md col-12 q-pa-md column items-center">
            <div
                v-html="rendered"
                class="full-width"
            />
        </div>

        <div
            v-if="rendered"
            class="col-12 code-actions"
        >
            <q-btn
                icon="get_app"
                color="primary"
                @click="downloadCode"
            >
                Download PNG
            </q-btn>

            <q-btn
                icon="add"
                color="positive"
                @click="addToCollection"
            >
                Save to collection
            </q-btn>
        </div>
    </div>
</template>

<script>
import highlighterService from '@/services/highlighter';
import { debounceWithPromise, notify } from '@/utils';
import '@/styles/_shiki-highlighter.scss';
import { LoadingBar } from 'quasar';
import CodeEditor from './CodeEditor';

export default {
    name: 'CodeHighlighter',

    data() {
        return {
            rendered: null,
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
                } catch (errs) {
                    this.catchErrors(errs);
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
                } catch (errs) {
                    this.catchErrors(errs);
                }
                LoadingBar.stop();
            }
        },

        async addToCollection() {
            if (this.codeInput) {
                LoadingBar.start();
                try {
                    await highlighterService.storeCode(this.codeConfig, this.codeInput);

                    notify('Code snippet saved!');
                } catch (errs) {
                    this.catchErrors(errs);
                }
                LoadingBar.stop();
            }
        },

        catchErrors(errors) {
            errors.forEach((err) => notify(err.message));
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
        CodeEditor,
    },
};
</script>

<style lang="scss" scoped>
.code-actions {
    width: 100%;
    padding: 2rem 10vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}
</style>
