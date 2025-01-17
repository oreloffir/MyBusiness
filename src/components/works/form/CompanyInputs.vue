<template>
    <v-row class="companyInputsContainer">
        <v-col cols="12" md="4" sm="4">
            <v-text-field label="* איש קשר"
                          v-model="workCard.contact"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="4">
            <v-combobox :input="workCard.companyType"
                        :items="companies"
                        label="* חברה"
                        v-model="workCard.companyType"
            ></v-combobox>
        </v-col>
        <v-col cols="12" md="4" sm="4">
            <v-text-field label="* לוחית רישוי"
                          placeholder="XX-XXX-XX"
                          required
                          v-model="workCard.licensePlate"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";

    const works = namespace('works');

    @Component
    export default class CompanyInputs extends Vue {
        @Prop({required: true})
        public readonly workCard: WorkCard;

        @works.Getter
        public companies: Array<string>;

        constructor() {
            super();
        }
    }
</script>

<style scoped>

</style>
