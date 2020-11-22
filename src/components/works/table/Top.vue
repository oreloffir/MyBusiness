<template>
    <v-text-field
            class="mx-4"
            label="חיפוש"
            v-model="model"
    ></v-text-field>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component
    export default class TableTop extends Vue {
        @Prop({default: ''}) search: string;
        private model = '';

        constructor() {
            super();
        }

        @Watch('model')
        updateModel(value) {
            this.model = value;
            this.$emit('search', value);
        }
    }
</script>

<style scoped>

</style>
