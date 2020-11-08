<template>
    <div class="worksTable">
        <v-data-table
                item-key="id"
                class="elevation-1"
                :items="works"
                :headers="headers"
                :search="search"
                :custom-filter="searchFilter"
                :fixed-header="true"
                :height="tableHeight"
        >
            <template v-slot:top>
                <v-text-field
                        v-model="search"
                        label="חיפוש"
                        class="mx-4"
                ></v-text-field>
            </template>
            <template v-slot:item.date="{ item }">
                <span>{{ dateString(item.date) }}</span>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon @click="edit(item)">mdi-briefcase-edit</v-icon>
                <v-icon @click="deleteWork(item)">mdi-delete-circle</v-icon>
            </template>
            <template v-slot:body.append>
                <tr>
                    <td colspan="1">
                        <v-text-field
                                v-model="month"
                                type="string"
                                label="חודש"
                        ></v-text-field>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        name : "worksTable",
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
            }
        },
        computed : {
            headers() {
                return [
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
                    { text : 'זמן עבודה', value : 'workTime' },
                    { text : 'תיאור עבודה', value : 'description', width : 350, height : 100 },
                    { text : 'מחיר עבודה', value : 'workPrice' },
                    { text : 'מחיר חלקים', value : 'partsPrice' },
                    { text : 'הוצאות', value : 'partsCost' },
                    { text : 'שולם', value : 'paidSum' },
                    { text : 'אמצעי תשלום', value : 'paymentInstrument' },
                    { text : 'הערות', value : 'notes', sortable : false },
                    { text : 'פעולות', value : 'actions', sortable : false, width : 100 },
                ]
            },
            tableHeight() {
                return document.body.clientHeight - 230;
            }
        },
        methods : {
            ...mapActions({
                editWork : 'works/editWork',
                deleteWork : 'works/deleteWork'
            }),
            edit(workCard) {
                this.editWork(workCard);
                this.$emit('openModal');
            },
            searchFilter(value, search, item) {
                return value != null && search != null &&
                    value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
            },
            dateString(timestamp) {
                return new Date(timestamp).toLocaleDateString();
            },
            filterOnlyCapsText(value, search, item) {
                return value != null &&
                    search != null &&
                    typeof value === 'string' &&
                    value.toString().toLocaleUpperCase().indexOf(search) !== -1
            },
        }
    }
</script>

<style>
</style>
