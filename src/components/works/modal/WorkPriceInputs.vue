<template>
    <v-row>
        <v-col cols="12" md="4" sm="6">
            <v-text-field label="* מחיר עבודה"
                          required
                          type="number"
                          v-model="workCard.workPrice"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-text-field label="מחיר חלקים"
                          type="number"
                          v-model="workCard.partsPrice"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-text-field hint="עלות החלקים כולל מע''מ"
                          label="הוצאות"
                          persistent-hint
                          required
                          type="number"
                          v-model="workCard.partsCost"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";

    const works = namespace('works');

    @Component
    export default class WorkPriceInput extends Vue {
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
