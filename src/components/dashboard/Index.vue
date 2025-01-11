<template>
    <v-row class="text-center d-flex justify-space-around mb-4">
        <v-col>
            <h2 class="headline font-weight-bold">
                אמצעי תשלום
            </h2>
            <pie-chart :payload="paymentInstrumentChartData" />
        </v-col>

        <v-col>
            <h2 class="headline font-weight-bold">
                לקוחות
            </h2>
            <pie-chart :payload="{data:[25, 75, 30], colors:['#000132', '#123654', '#578321']}"/>
        </v-col>

        <v-col>
            <h2 class="headline font-weight-bold">
                סכום הכנסה
            </h2>
            <pie-chart :colors="['red', 'green', 'blue']"
                       :labels="['Red', 'Green', 'Blue']"
                       :payload="[25, 75, 30]"/>
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
            this.initialize();
        }

        @Action('dashboard/initialize')
        initialize!: () => void;
    }
</script>
