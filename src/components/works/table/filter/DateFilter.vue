<template>
    <v-select
            :items="monthFilterOptions"
            class="mx-4"
            label="חודשים"
            multiple
            v-model="monthSelection"
    ></v-select>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorksTable from "@/utils/worksTable/WorksTable";

    const works = namespace('works');

    @Component({
        name: 'DateFilter',
    })
    export default class DateFilter extends Vue {
        @works.State
        public worksTable: WorksTable;
        public monthSelection = [];
        private months = [
            {value: '11/19', label: 'נובמבר 19'},
            {value: '12/19', label: 'דצמבר 19'},
            {value: '01/20', label: 'ינואר 20'},
            {value: '02/20', label: 'פברואר 20'},
            {value: '03/20', label: 'מרץ 20'},
            {value: '04/20', label: 'אפריל 20'},
            {value: '05/20', label: 'מאי 20'},
            {value: '06/20', label: 'יוני 20'},
            {value: '07/20', label: 'יולי 20'},
            {value: '08/20', label: 'אוגוסט 20'},
            {value: '09/20', label: 'ספטמבר 20'},
            {value: '10/20', label: 'אוקטובר 20'},
            {value: '11/20', label: 'נובמבר 20'},
            {value: '12/20', label: 'דצמבר 20'},
        ];

        constructor() {
            super();
        }

        get monthFilterOptions() {
            return this.months.map(month => {
                return month.label
            }).reverse();
        }

        @Watch('monthSelection')
        private updateMonthsSelection(value: Array<string>) {
            this.worksTable.dateFilter.months = new Map();
            this.worksTable.dateFilter.years = new Map();

            value.forEach(val => {
                const selectedDate = this.months.find(month => {
                    return month.label === val
                });
                if (selectedDate) {
                    const [month, year] = selectedDate.value.split('/');

                    this.worksTable.dateFilter.months.set(parseInt(month), month);
                    this.worksTable.dateFilter.years.set(parseInt(year), year);
                }
            });
        }
    }
</script>

<style scoped>

</style>
