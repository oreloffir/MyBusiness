<template>
    <div class="worksTableContainer">
        <v-data-table
                item-key="id"
                :items="works"
                :headers="headers"
                :search="search"
                :custom-filter="searchFilter"
                :fixed-header="true"
                :height="tableHeight"
        >
            <template v-slot:top>
                <table-top :search="search" @search="searchUpdate"/>
            </template>
            <template v-slot:item.date="{ item }">
                <table-date-column :workCard="item"/>
            </template>
            <template v-slot:item.paymentInstrument="{ item }">
                <table-payment-column :workCard="item"/>
            </template>
            <template v-slot:item.actions="{ item }">
                <table-row-actions-column :workCard="item" @openModal="edit"/>
            </template>

        </v-data-table>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import WorkCard from "../../../utils/workCard/WorkCard";
    import TableTop from "./Top";
    import TableDateColumn from "./DateColumn";
    import TablePaymentColumn from "./PaymentColumn";
    import TableRowActionsColumn from "./RowActionsColumn";

    export default {
        name : "WorksTable",
        props : {
            works : {
                type : Array,
                default : () => {
                    return [];
                }
            }
        },
        data() {
            return {
                search : '',
                month : 0,
                headers : [
                    {
                        text : 'תאריך',
                        align : 'start',
                        value : 'date',
                        dataType : 'Date',
                        width : 100,
                        filter : value => {
                            if (!parseInt(this.month)) return true;

                            return new Date(value).getMonth() + 1 === parseInt(this.month);
                        },
                    },
                    {
                        text : 'איש קשר',
                        value : 'contact',
                    },
                    { text : 'לקוח', value : 'companyType' },
                    { text : 'לוחית רישוי', value : 'licensePlate', width : 95 },
                    { text : 'שעות עבודה', value : 'workTime' },
                    { text : 'תיאור עבודה', value : 'description', width : 350, height : 100 },
                    { text : 'מחיר עבודה', value : 'workPrice' },
                    { text : 'מחיר חלקים', value : 'partsPrice' },
                    { text : 'הוצאות', value : 'partsCost' },
                    { text : 'שולם', value : 'paidSum' },
                    { text : 'אמצעי תשלום', value : 'paymentInstrument' },
                    { text : 'הערות', value : 'notes', sortable : false },
                    { text : 'פעולות', value : 'actions', sortable : false, width : 100 },
                ]
            }
        },
        components : {
            TableTop,
            TableDateColumn,
            TablePaymentColumn,
            TableRowActionsColumn
        },
        computed : {
            tableHeight() {
                return document.body.clientHeight - 230;
            }
        },
        methods : {
            ...mapActions({
                editWork : 'works/editWork',
                deleteWork : 'works/deleteWork'
            }),
            searchUpdate(val) {
                this.search = val;
            },
            edit() {
                this.$emit('openModal');
            },
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
            }
        }
    }
</script>

<style scoped>

</style>
