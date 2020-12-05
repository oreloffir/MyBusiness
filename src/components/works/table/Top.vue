<template>
    <v-row>
        <v-col cols="12" lg="2" md="3" sm="12">
            <search-filter></search-filter>
        </v-col>
        <v-col cols="12" lg="4" md="6" sm="12">
            <date-filter></date-filter>
        </v-col>
        <v-col cols="12" lg="4" md="6" sm="12">
            <payment-filter></payment-filter>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import PaymentFilter from "@/components/works/table/filter/PaymentFilter.vue";
    import SearchFilter from "@/components/works/table/filter/SearchFilter.vue";
    import DateFilter from "@/components/works/table/filter/DateFilter.vue";


    @Component({
        name: 'TableTop',
        components: {
            PaymentFilter,
            SearchFilter,
            DateFilter,
        },
    })
    export default class TableTop extends Vue {
    }
</script>
