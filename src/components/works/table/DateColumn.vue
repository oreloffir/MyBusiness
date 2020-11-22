<template>
    <span>{{ dateString }}</span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import WorkCard from "@/utils/workCard/WorkCard";

    @Component
    export default class TableDateColumn extends Vue {
        @Prop({required: true}) readonly workCard: WorkCard;

        constructor() {
            super();
        }

        get dateString(): string {
            return this.workCard.dateString;
        }
    }
</script>

<style scoped>

</style>
