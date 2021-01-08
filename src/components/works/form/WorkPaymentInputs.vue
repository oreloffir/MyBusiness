<template>
    <v-row>
        <v-col cols="12" sm="4">
            <v-text-field label="שולם"
                          required
                          v-model="workCard.paidSum"
            ></v-text-field>
        </v-col>
        <v-col cols="12" sm="4">
            <v-autocomplete :items="paymentSelectItems"
                            label="אמצעי תשלום"
                            single
                            v-model="workCard.paymentInstrument"
            ></v-autocomplete>
        </v-col>
        <v-col cols="12" sm="4">
            <v-switch :label="workPaidLabel"
                      color="success"
                      v-model="workCard.paid"
            ></v-switch>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import WorkCard from "@/utils/workCard/WorkCard";
    import PaymentInstrumentService from "@/utils/paymentInstrument/paymentInstrument.service";

    @Component
    export default class WorkPaymentInputs extends Vue {
        @Prop({required: true})
        public readonly workCard: WorkCard;
        public paymentSelectItems !: Array<{ value: string; text: string }>;

        created() {
            this.processPaymentInstrumentItems();
        }

        public processPaymentInstrumentItems() {
            this.paymentSelectItems = PaymentInstrumentService.paymentInstruments.map(instrument => {
                return {value: instrument.value, text: instrument.fullText};
            });
        }

        get workPaidLabel() {
            return 'כרטיס ' + (this.workCard.paid ? 'סגור' : 'פתוח');
        }
    }
</script>
