<!-- <template>
    <div class="row justify-center">
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
</template>

<script>
export default {
    name: 'CodeEditorPanel',
};
</script> -->
