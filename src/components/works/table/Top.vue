<template>
    <div>

        <v-btn @click="openNewWorkModal"
               icon
               x-large
        >
            <v-icon color="teal darken-1" large>
                mdi-newspaper-plus
            </v-icon>
        </v-btn>
        <v-btn @click="toggleFilterMenu"
               icon
               x-large
        >
            <v-icon color="light-blue darken-2"
                    large>mdi-filter-menu
            </v-icon>
        </v-btn>
        <search-filter></search-filter>
        <v-card class="filterMenu" v-show="menuOpen">
            <date-filter></date-filter>
            <payment-filter></payment-filter>
        </v-card>
        <summery></summery>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import PaymentFilter from "@/components/works/table/filter/PaymentFilter.vue";
    import SearchFilter from "@/components/works/table/filter/SearchFilter.vue";
    import DateFilter from "@/components/works/table/filter/DateFilter.vue";
    import Summery from "@/components/works/summery/Index.vue";


    @Component({
        name: 'TableTop',
        components: {
            PaymentFilter,
            SearchFilter,
            DateFilter,
            Summery,
        },
    })
    export default class TableTop extends Vue {
        public menuOpen = false;

        constructor() {
            super();
        }

        public toggleFilterMenu() {
            this.menuOpen = !this.menuOpen;
            this.$emit('toggleFilterMenu', this.menuOpen);
        }

        public openNewWorkModal() {
            this.$emit('openNewWorkModal', true);
        }
    }
</script>
<style>
    .filterMenu {
        z-index: 10;
        top: 120px;
        right: 0;
        position: absolute;
        max-width: 250px;
        height: calc(100vh - 185px);
    }
</style>
