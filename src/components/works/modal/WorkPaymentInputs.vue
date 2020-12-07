<template>
    <v-row>
        <v-col cols="12" sm="1">
            <v-checkbox v-model="workCard.paid"
            ></v-checkbox>
        </v-col>
        <v-col cols="12" sm="5">
            <v-text-field label="שולם"
                          required
                          v-model="workCard.paidSum"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
            <v-autocomplete :items="paymentSelectItems"
                            label="אמצעי תשלום"
                            single
                            v-model="workCard.paymentInstrument"
            ></v-autocomplete>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";

    const works = namespace('works');

    @Component
    export default class WorkPaymentInputs extends Vue {
        @works.State
        public modalWorkCard!: WorkCard;
        public paymentSelectItems !: Array<{ value: string; text: string }>;

        constructor() {
            super();
            this.paymentSelectItems = [
                {
                    value: "CHECK",
                    text: "צ'ק"
                },
                {
                    value: "CASH",
                    text: "מזומן"
                },
                {
                    value: "CREDIT_CARD",
                    text: "כרטיס אשראי"
                },
                {
                    value: "REMITTANCE",
                    text: "העברה בנקאית"
                }
            ]
        }

        get workCard() {
            return this.modalWorkCard;
        }
    }
</script>
