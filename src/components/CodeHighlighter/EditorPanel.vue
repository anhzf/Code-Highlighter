<template>
    <div class="row full-width justify-center">
        <q-select
            v-model="lang"
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
                v-model="fileName"
                label="File Name (Optional)"
                dense
                square
                class="col-grow"
            >
                <q-tooltip>Add meta filename to display the filename</q-tooltip>
            </q-input>
            <q-select
                v-if="['typescript', 'json'].includes(lang)"
                v-model="twoslashes"
                label="Twoslashes"
                class="col-2"
                dense
                square
                :options="twoslashesOps"
            />
        </template>
        <q-input
            v-model.number="highlightedLine"
            label="Highlighted Line"
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

            lang: '',
            twoslashes: '',
            fileName: '',
            highlightedLine: null,
        };
    },

    methods: {
        async getAvailableOptions() {
            ({
                languages: this.langOps,
                twoslashes: this.twoslashesOps,
            } = await highlighterServices.getAvailableOptions());
        },

        setupConfig() {
            const config = {
                lang: this.lang,
                fileName: this.fileName,
                highlight: this.highlightedLine,
                twoslash: this.twoslashes,
            };

            this.$store.commit('highlighter/setConfig', config);
        },
    },

    watch: {
        lang() {
            this.setupConfig();
        },
        fileName() {
            this.setupConfig();
        },
        highlightedLine() {
            this.setupConfig();
        },
        twoslashesOps() {
            this.setupConfig();
        },
    },

    mounted() {
        this.getAvailableOptions();
    },
};
</script>
