<template>
    <div class="q-pa-md">
        <div class="row full-width justify-center">
            <q-select
                v-model="lang"
                label="Language"
                :options="ops.langOps"
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
                    :options="ops.twoslashesOps"
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

        <q-input
            :value="value"
            type="textarea"
            outlined
            autogrow
            square
            :input-style="{height: '70vh'}"
            @keydown.tab.self.prevent="enableTab"
            @input="$emit('input', $event)"
        />
    </div>
</template>

<script>
import supportTab from 'src/mixins/supportTab';

export default {
    name: 'CodeEditor',

    mixins: [supportTab],

    props: {
        value: {
            type: String,
            default: '',
        },
        ops: {
            type: Object,
            default: () => ({ langOps: {}, twoslashesOps: {} }),
        },
    },

    data: () => ({
        lang: null,
        fileName: null,
        highlightedLine: null,
        twoslashes: null,
    }),

    methods: {
        sendConfigToParent() {
            const config = {
                lang: this.lang,
                fileName: this.fileName,
                highlight: this.highlightedLine,
                twoslash: this.twoslashes,
            };

            this.$emit('config-updated', config);
        },
    },

    watch: {
        lang() {
            this.sendConfigToParent();
        },

        fileName() {
            this.sendConfigToParent();
        },

        highlightedLine() {
            this.sendConfigToParent();
        },

        twoslashesOps() {
            this.sendConfigToParent();
        },
    },

    components: {
    },
};
</script>
