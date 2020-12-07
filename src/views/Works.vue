<template>
    <div class="works">
        <v-row style="display: flex; justify-content: space-between">
            <v-col>
                <works-modal v-model="showModal"></works-modal>
            </v-col>
        </v-row>
        <works-table :table="worksTable"></works-table>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import WorksTable from '../components/works/table/Index';
    import WorksModal from '../components/works/modal/Index';

    export default {
        components : {
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
