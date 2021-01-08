<template>
    <v-row>
        <v-col cols="12" md="12" sm="12">
            <v-text-field hint="תיקון, טיפול, חילוץ"
                          label="תיאור"
                          persistent-hint
                          required
                          v-model="workCard.description"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import WorkCard from "@/utils/workCard/WorkCard";

    @Component
    export default class WorkDescriptionInput extends Vue {
        @Prop({required: true})
        public readonly workCard: WorkCard;

        constructor() {
            super();
        }
    }
</script>
