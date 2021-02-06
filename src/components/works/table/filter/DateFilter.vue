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
        public dates: Array<{ key: string; label: string}>;
        public monthSelection = [];

        created() {
            this.dates = [];
            this.initFilterOptions();
        }

        private initFilterOptions() {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();

            for (let year = 2020; year <= currentYear; year++) {
                const fullYear = year < currentYear;

                for (let month = 0; month <= currentMonth || (fullYear && month < 12); month++) {
                    const key = `${month < 9 ? 0 : ''}${month + 1}/${year}`;
                    const label = `${DateFilter.getMonthLabel(month)} ${year}`;

                    this.dates.push({key, label});
                }
            }
        }

        get monthFilterOptions() {
            return this.dates.map(month => {
                return month.label
            }).reverse();
        }

        private static getMonthLabel(month: number) {
            return [
                'ינואר',
                'פברואר',
                'מרץ',
                'אפריל',
                'מאי',
                'יוני',
                'יולי',
                'אוגוסט',
                'ספטמבר',
                'אוקטובר',
                'נובמבר',
                'דצמבר',
            ][month];
        }

        @Watch('monthSelection')
        private updateMonthsSelection(value: Array<string>) {
            this.worksTable.dateFilter.months = new Map();
            this.worksTable.dateFilter.years = new Map();

            value.forEach(val => {
                const selectedDate = this.dates.find(month => {
                    return month.label === val
                });
                if (selectedDate) {
                    const [month, year] = selectedDate.key.split('/');

                    this.worksTable.dateFilter.months.set(parseInt(month), month);
                    this.worksTable.dateFilter.years.set(parseInt(year), year);
                }
            });
        }
    }
</script>

<style scoped>

</style>
