<template>
    <div class="works">
        <v-row style="display: flex; justify-content: space-between">
            <v-col>
                <works-modal v-model="showModal"></works-modal>
            </v-col>
            <v-col class="col-sm-1" cols="12">
                <works-summery></works-summery>
            </v-col>
        </v-row>
        <works-table :table="worksTable"></works-table>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import WorksTable from '../components/works/table/Index';
    import WorksModal from '../components/works/modal/Index';
    import WorksSummery from '../components/works/summery/Index';

    export default {
        components : {
            WorksSummery,
            WorksTable,
            WorksModal
        },
        computed : {
            ...mapState({
                worksData : state => state.works.worksData,
                worksTable : state => state.works.worksTable,
                showWorkModal : state => state.works.showModal,
            }),
            showModal() {
                return this.showWorkModal;
            },
        },
        methods : {
            ...mapActions({
                init : 'works/initialize'
            })
        },
        created() {
            this.init();
        }
    }
</script>
