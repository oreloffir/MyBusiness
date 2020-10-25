<template>
    <div class="works">
        <works-modal :dialog="dialog" @save="save"></works-modal>
        <works-table :works="tableData" @edit="edit"></works-table>
    </div>
</template>

<script>
    import WorksTable from '../components/works/table';
    import WorksModal from '../components/works/modal';
    import worksData from '../store/works.json';

    export default {
        data() {
            return {
                dialog : {
                    show : false,
                    data : {
                        workCard : {
                            date : Date.now(),
                            contact : null,
                            companyType : 1,
                            licensePlate : 'XX-XXX-XX',
                            workTime : null,
                            description : null,
                            workPrice : 0,
                            partsPrice : 0,
                            partsCost : 0,
                            paidSum : 0,
                            paid : false,
                            paymentInstrument : null,
                            notes : null
                        }
                    }
                },
                works : worksData.data,
            }
        },
        components : {
            WorksTable,
            WorksModal
        },
        computed : {
            tableData() {
                return this.works;
            },
        },
        methods : {
            save(workCard) {
                this.works.push(workCard);
            },
            edit(workCard) {
                this.dialog.data.workCard = workCard;
                this.dialog.show = true;
            }
        }
    }
</script>
