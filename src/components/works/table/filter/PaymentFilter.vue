<template>
    <v-chip-group class="mx-4" column multiple v-model="paymentSelection">
        <v-chip :key="payment.value" filter outlined v-for="payment in paymentInstruments">
            <v-icon :color="payment.color + ' darken-2'" small>{{ payment.icon }}</v-icon>
            <span>{{ payment.label }}</span>
        </v-chip>
    </v-chip-group>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorksTable from "../../../../utils/worksTable/WorksTable";
    import PaymentInstrumentService from "../../../../utils/paymentInstrument/paymentInstrument.service";
    import PaymentInstrumentInterface from "../../../../utils/paymentInstrument/paymentInstrument.interface";

    const works = namespace('works');

    @Component
    export default class PaymentFilter extends Vue {
        @works.State
        public worksTable: WorksTable;
        public paymentSelection = [];

        constructor() {
            super();
        }

        get paymentInstruments(): Array<PaymentInstrumentInterface> {
            return PaymentInstrumentService.paymentInstruments;
        }

        @Watch('paymentSelection')
        private updatePaymentSelection(value: Array<string>) {
            this.worksTable.paymentInstrumentFilter.instruments = new Map();

            value.forEach((value: string) => {
                const index = parseInt(value);
                const selectedInstrument = this.paymentInstruments[index];

                if (selectedInstrument) {
                    this.worksTable.paymentInstrumentFilter.instruments.set(selectedInstrument.value, index);
                }
            });
        }
    }
</script>

<style scoped>

</style>
