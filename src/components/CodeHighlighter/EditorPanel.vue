<template>
    <div class="row full-width justify-center">
        <q-select
            v-model.lazy="lang"
            label="Language"
            :options="langOps"
            dense
            square
            class="col-grow"
        >
            <q-tooltip>Choose your programming language will be used</q-tooltip>
        </q-select>
        <template>
            <q-input
                v-model.lazy="fileName"
                label="File Name (Optional)"
                dense
                square
                class="col-grow"
            >
                <q-tooltip>Add meta filename to display the filename</q-tooltip>
            </q-input>
            <q-select
                v-if="['typescript', 'json'].includes(lang)"
                v-model.lazy="twoslashes"
                label="Twoslashes"
                class="col-2"
                dense
                square
                :options="twoslashesOps"
            />
        </template>
        <q-input
            v-model.lazy.number="highlightedLine"
            label="Highlighted Line (Optional)"
            type="number"
            dense
            square
            class="col-auto"
        >
            <q-tooltip>Specify the line number to be highlighted</q-tooltip>
        </q-input>
    </div>
</template>

<script>
import highlighterServices from '@/services/highlighter';

export default {
    name: 'EditorPanel',

    data() {
        return {
            langOps: [],
            twoslashesOps: [],
        };
    },

    computed: {
        lang: {
            get() {
                return this.$store.state.highlighter.lang;
            },
            set(v) {
                this.$store.commit('highlighter/setLang', v);
            },
        },
        twoslashes: {
            get() {
                return this.$store.state.highlighter.twoslash;
            },
            set(v) {
                this.$store.commit('highlighter/setTwoslash', v);
            },
        },
        fileName: {
            get() {
                return this.$store.state.highlighter.fileName;
            },
            set(v) {
                this.$store.commit('highlighter/setFileName', v);
            },
        },
        highlightedLine: {
            get() {
                return this.$store.state.highlighter.highlight;
            },
            set(v) {
                this.$store.commit('highlighter/setHighlight', v);
            },
        },
    },

    methods: {
        async getAvailableOptions() {
            ({
                languages: this.langOps,
                twoslashes: this.twoslashesOps,
            } = await highlighterServices.getAvailableOptions());
        },
    },

    mounted() {
        this.getAvailableOptions();
    },
};
</script>
