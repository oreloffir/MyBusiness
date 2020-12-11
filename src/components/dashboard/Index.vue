<template>
    <v-row class="text-center d-flex justify-space-around mb-4">
        <v-col>
            <h2 class="headline font-weight-bold">
                אמצעי תשלום
            </h2>
            <pie-chart :payload="paymentInstrumentChartData">
            </pie-chart>
        </v-col>

        <v-col>
            <h2 class="headline font-weight-bold">
                סכום עבודה
            </h2>
            <pie-chart :payload="[25, 75, 30]">
            </pie-chart>
        </v-col>

        <v-col>
            <h2 class="headline font-weight-bold">
                סכום הכנסה
            </h2>
            <pie-chart :colors="['red', 'green', 'blue']"
                       :labels="['Red', 'Green', 'Blue']"
                       :payload="[25, 75, 30]">
            </pie-chart>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import PieChart from '@/components/charts/Pie.vue';
    import {Action, namespace} from 'vuex-class';

    const dashboard = namespace('dashboard');


    @Component({
        components: {
            PieChart
        }
    })
    export default class Dashboard extends Vue {
        @dashboard.Getter
        public paymentInstrumentChartData!: object;

        public constructor() {
            super();
            // this.initialize();
        }

        @Action('dashboard/initialize')
        initialize!: () => void;
    }
</script>
