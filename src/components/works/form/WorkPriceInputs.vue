<template>
    <v-row>
        <v-col cols="12" md="4" sm="4">
            <v-text-field label="* מחיר עבודה"
                          required
                          type="number"
                          v-model="workCard.workPrice"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="4">
            <v-text-field label="מחיר חלקים"
                          type="number"
                          v-model="workCard.partsPrice"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="4">
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
    import {Component, Prop, Vue} from "vue-property-decorator";
    import WorkCard from "@/utils/workCard/WorkCard";

    @Component
    export default class WorkPriceInput extends Vue {
        @Prop({required: true})
        public readonly workCard: WorkCard;

        constructor() {
            super();
        }
    }
</script>
