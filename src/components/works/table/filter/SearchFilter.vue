<template>
    <v-text-field
            :input="search"
            class="searchInput"
            label="חיפוש"
            v-model="search"
    ></v-text-field>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorksTable from "@/utils/worksTable/WorksTable";

    const works = namespace('works');

    @Component({
        name: 'SearchFilter',
    })
    export default class SearchFilter extends Vue {
        @works.State
        public worksTable: WorksTable;

        constructor() {
            super();
        }

        get search() {
            if (!this.worksTable)
                return '';

            return this.worksTable.search;
        }

        set search(val: string) {
            if (!this.worksTable)
                return;

            this.worksTable.search = val;
        }
    }
</script>

<style>
    .searchInput{
        display: inline-block;
        max-width: 150px;
    }
</style>
