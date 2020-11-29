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
            return this.workCard.paymentInst.text;
        }

        get paymentIcon(): string {
            return this.workCard.paymentInst.icon;
        }

        get paymentIconColor(): string {
            switch (this.workCard.paymentInst.value) {
                case "CREDIT_CARD":
                    return 'gray darken-2';
                case "REMITTANCE":
                    return 'purple darken-2';
                case "CHECK":
                    return 'yellow darken-2';
                case "CASH":
                    return 'green darken-2';
                default:
                    return null;
            }
        }
    }
</script>

<style scoped>
    span {
        margin-right: 3px;
    }
</style>
