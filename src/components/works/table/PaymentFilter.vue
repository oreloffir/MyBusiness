<template>
    <v-col cols="12" lg="4" md="6" sm="12">
        <v-chip-group column multiple v-model="paymentSelection">
            <v-chip :key="payment.value" filter outlined v-for="payment in paymentInstruments">
                <v-icon :color="payment.color + ' darken-2'" small>{{ payment.icon }}</v-icon>
                <span>{{ payment.label }}</span>
            </v-chip>
        </v-chip-group>
    </v-col>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorksTable from "@/utils/worksTable/WorksTable";
    import PaymentInstrumentService from "@/utils/paymentInstrument/paymentInstrument.service";
    import PaymentInstrumentInterface from "@/utils/paymentInstrument/paymentInstrument.interface";

    const works = namespace('works');

    @Component
    export default class PaymentFilter extends Vue {
        @works.State
        public worksTable: WorksTable;
        public paymentSelection = [];

        constructor() {
            super();
        }

        static get paymentInstruments(): Array<PaymentInstrumentInterface> {
            return PaymentInstrumentService.paymentInstruments;
        }

        @Watch('paymentSelection')
        private updatePaymentSelection(value: Array<string>) {
            this.worksTable.paymentInstrumentFilter.instruments = new Map();

            value.forEach((value: string) => {
                const index = parseInt(value);
                const selectedInstrument = PaymentFilter.paymentInstruments[index];

                if (selectedInstrument) {
                    this.worksTable.paymentInstrumentFilter.instruments.set(selectedInstrument.value, index);
                }
            });
        }
    }
</script>

<style scoped>

</style>
