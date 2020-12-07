<template>
    <div class="worksTableContainer" ref="worksTableContainer">
        <v-data-table
                item-key="id"
                :items="works"
                :headers="headers"
                :search="search"
                :fixed-header="true"
                :height="tableHeight"
                :footer-props="{'items-per-page-options': [50, 250, 500, -1]}"
                @current-items="setDisplayedWorks"
        >
            <template v-slot:top>
                <table-top/>
            </template>
            <template v-slot:item.date="{ item }">
                <table-date-column :workCard="item"/>
            </template>
            <template v-slot:item.paymentInstrument="{ item }">
                <table-payment-column :workCard="item"/>
            </template>
            <template v-slot:item.actions="{ item }">
                <table-row-actions-column :workCard="item"/>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import WorkCard from "../../../utils/workCard/WorkCard";
    import WorksTable from "../../../utils/worksTable/WorksTable";
    import TableTop from "./Top";
    import TableDateColumn from "./DateColumn";
    import TablePaymentColumn from "./PaymentColumn";
    import TableRowActionsColumn from "./RowActionsColumn";

    export default {
        name : "WorksTable",
        props : {
            table : {
                type : WorksTable,
            }
        },
        data() {
            return {}
        },
        components : {
            TableTop,
            TableDateColumn,
            TablePaymentColumn,
            TableRowActionsColumn
        },
        computed : {
            works() {
                if (!this.table)
                    return [];

                return this.table.works
            },
            headers() {
                if (!this.table)
                    return [];

                return this.table.headers
            },
            search : {
                get() {
                    if (this.table) {
                        return this.table.search;
                    }

                    return '';
                }
            },
            tableHeight() {
                return document.body.clientHeight - 255;
            }
        },
        methods : {
            ...mapActions({
                editWork : 'works/editWork',
                deleteWork : 'works/deleteWork'
            }),
            searchFilter(value, search) {
                return value != null && search != null &&
                    value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
            },
            filterOnlyCapsText(value, search) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' &&
                    value.toString().toLocaleUpperCase().indexOf(search) !== -1
            },
            dateString(item) {
                return new WorkCard(item).dateString;
            },
            paymentLabel(item) {
                return new WorkCard(item).paymentInst.text;
            },
            setDisplayedWorks(items) {
                if (!this.table)
                    return;

                this.table.displayedWorks = items;
            }
        },
    }
</script>

<style scoped>

</style>
