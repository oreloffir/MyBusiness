<template>
    <div class="works">
        <works-table
                :table="worksTable"
                @openNewWorkModal="openModal(true)"
        ></works-table>
        <works-modal v-model="showModal"></works-modal>
    </div>
</template>

<script>
    import '@/style/works/index.scss';
    import {mapActions, mapState} from "vuex";
    import WorksTable from "../components/works/table/Index";
    import WorksModal from "../components/works/modal/Index";

    export default {
        components : {
            WorksTable,
            WorksModal
        },
        computed : {
            ...mapState({
                worksData : state => state.works.worksData,
                worksTable : state => state.works.worksTable,
                showWorkModal : state => state.works.showModal
            }),
            showModal() {
                return this.showWorkModal;
            }
        },
        methods : {
            ...mapActions({
                init : "works/initialize",
                openModal : "works/newWork"
            })
        },
        created() {
            this.init();
        }
    };
</script>
