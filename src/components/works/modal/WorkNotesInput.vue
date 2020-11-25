<template>
    <v-col cols="12">
        <v-text-field label="הערות"
                      v-model="workCard.notes"
        ></v-text-field>
    </v-col>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";

    const works = namespace('works');

    @Component
    export default class WorkNotesInput extends Vue {
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
