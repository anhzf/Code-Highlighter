<template>
    <q-page
        class="row items-start q-gutter-xl"
        padding
    >
        <code-editor
            v-model.lazy="codeInput"
            class="col"
            :my-ops="options"
            :ops="{langOps, twoslashesOps}"
            @config-updated="options = $event"
        />

        <div
            class="col"
            v-html="rendered"
        />
    </q-page>
</template>

<script>
import CodeEditor from 'components/CodeEditor';
import highlightAPI from 'src/services/highlightAPI';
import debounce from 'lodash/debounce';

export default {
    name: 'PageIndex',

    data: () => ({
        codeInput: '',
        options: {},
        rendered: '',
        langOps: [],
        twoslashesOps: [],
    }),

    methods: {
        post2Server: debounce(async function () {
            const config = JSON.parse(JSON.stringify(this.options));

            const highlighted = await highlightAPI.post('/', { code: this.codeInput }, config);

            ({ data: this.rendered } = highlighted);
        }, 2000),

        async getAvailableOptions() {
            ({
                data: {
                    languages: this.langOps,
                    twoslashes: this.twoslashesOps,
                },
            } = await highlightAPI.get('options'));

            Object.freeze(this.langOps);
            Object.freeze(this.twoslashesOps);
        },
    },

    watch: {
        codeInput() {
            this.post2Server();
        },

        options() {
            this.post2Server();
        },
    },

    created() {
        this.getAvailableOptions();
    },

    components: {
        CodeEditor,
    },
};
</script>
