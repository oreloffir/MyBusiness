<template>
    <div class="rowActionsWrapper">
        <v-icon @click="edit">mdi-briefcase-edit</v-icon>
        <v-icon @click="deleteWork(workCard)">mdi-delete-circle</v-icon>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Action} from "vuex-class"
    import WorkCard from "@/utils/workCard/WorkCard";

    @Component
    export default class TableRowActionsColumn extends Vue {
        @Prop() readonly workCard: WorkCard;

        constructor() {
            super();
        }

        edit() {
            this.editWork(this.workCard);
            this.$emit('openModal');
        }

        @Action('works/editWork')
        editWork!: (workCard: WorkCard) => void;

        @Action('works/deleteWork')
        deleteWork!: (workCard: WorkCard) => void;
    }
</script>

<style scoped>

</style>
