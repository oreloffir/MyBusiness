<template>
    <div class="worksTableContainer">
        <v-data-table
                item-key="id"
                :items="works"
                :headers="headers"
                :search="search"
                :custom-filter="searchFilter"
                :fixed-header="true"
                :height="tableHeight"
        >

        </v-data-table>
    </div>
</template>

<script>
    export default {
        name : "WorksTable",
        props : {
            works : {
                type : Array,
                default : () => {
                    return [];
                }
            }
        },
    }
</script>

<style scoped>

</style>
