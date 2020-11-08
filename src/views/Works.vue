<template>
    <div class="works">
        <works-modal v-model="showModal"></works-modal>
        <works-table :works="worksData" @openModal="openModal"></works-table>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import WorksTable from '../components/works/table';
    import WorksModal from '../components/works/modal';

    export default {
        data() {
            return {
                showModal : false,
            }
        },
        components : {
            WorksTable,
            WorksModal
        },
        computed : {
            ...mapState({
                worksData : state => state.works.worksData
            }),
        },
        methods : {
            openModal(){
                this.showModal = true;
            }
        }
    }
</script>
