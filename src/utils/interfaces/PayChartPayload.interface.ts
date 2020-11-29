import Chart from 'chart.js'

export default interface PayChartPayloadInterface {
    options: Chart.ChartOptions;
    data: Array<number>;
    labels: Array<string>;
    colors: Array<string>;
}
