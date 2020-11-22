<template>
    <span>{{ paymentLabel }}</span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import WorkCard from "@/utils/workCard/WorkCard";

    @Component
    export default class TablePaymentColumn extends Vue {
        @Prop({required: true}) readonly workCard: WorkCard;

        constructor() {
            super();
        }

        get paymentLabel(): string {
            return this.workCard.paymentInst.text;
        }
    }
</script>

<style scoped>

</style>
