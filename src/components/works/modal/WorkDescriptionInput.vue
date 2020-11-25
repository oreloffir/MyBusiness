<template>
    <v-col cols="12" md="12" sm="12">
        <v-text-field hint="תיקון, טיפול, חילוץ"
                      label="תיאור"
                      persistent-hint
                      required
                      v-model="workCard.description"
        ></v-text-field>
    </v-col>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";

    const works = namespace('works');

    @Component
    export default class WorkDescriptionInput extends Vue {
        @works.State
        public modalWorkCard!: WorkCard;

        constructor() {
            super();
        }

        get workCard() {
            return this.modalWorkCard;
        }
    }
</script>
