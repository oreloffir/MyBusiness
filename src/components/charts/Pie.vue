<template>
    <canvas :id="id"></canvas>
</template>

<script lang="ts">
    import Chart from 'chart.js'
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import PayChartPayloadInterface from "@/utils/interfaces/PayChartPayload.interface";

    @Component
    export default class PieChart extends Vue {
        @Prop({
            default: () => {
                return {
                    options: Chart.defaults.pie,
                    data: [],
                    labels: [],
                    colors: [],
                }
            }
        })
        private readonly payload: PayChartPayloadInterface;
        private static counter = 0;
        private id !: string;

        public constructor() {
            super();
            this.id = 'paiCart' + PieChart.counter++;
        }

        @Watch('payload')
        private updateChart(payload: PayChartPayloadInterface) {
            this.createChart({
                datasets: [{
                    data: payload.data,
                    backgroundColor: payload.colors
                }],
                labels: payload.labels
            })
        }

        private createChart(chartData: object) {
            const canvas = document.getElementById(this.id) as HTMLCanvasElement;
            const options = {
                type: 'pie',
                data: chartData,
                options: this.payload.options
            };

            new Chart(canvas, options)
        }
    }
</script>
