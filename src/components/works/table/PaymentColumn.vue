<template>
    <v-row>
        <v-icon :color="paymentIconColor" small>{{ paymentIcon }}</v-icon>
        <span>{{ paymentLabel }}</span>
    </v-row>
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
            if (this.workCard.paymentInst)
                return this.workCard.paymentInst.label;

            return '';
        }

        get paymentIcon(): string | null {
            if (this.workCard.paymentInst)
                return this.workCard.paymentInst.icon;

            return '';
        }

        get paymentIconColor(): string {
            if (!this.workCard.paymentInst)
                return 'black';

            return this.workCard.paymentInst.color + ' darken-2';
        }
    }
</script>

<style scoped>
    span {
        margin-right: 3px;
    }
</style>
