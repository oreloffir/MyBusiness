<template>
    <span>{{ formattedDate }}</span>
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

      get formattedDate(): string {
        return this.formatDate(this.workCard.date);
      }

      formatDate(timestamp: number): string {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}/${month}/${year}`;
      }
    }
</script>

<style scoped>

</style>
