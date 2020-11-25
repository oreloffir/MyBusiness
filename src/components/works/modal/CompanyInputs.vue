<template>
    <v-row class="companyInputsContainer">
        <v-col cols="12" md="4" sm="6">
            <v-text-field label="איש קשר"
                          v-model="contact"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-autocomplete :input="companyType"
                            :items="['פרטי','יזמות','צבע ארגמן']"
                            label="חברה"
                            v-model="companyType"
            ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-text-field label="* לוחית רישוי"
                          placeholder="XX-XXX-XX"
                          required
                          v-model="licensePlate"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";

    const works = namespace('works');

    @Component
    export default class CompanyInputs extends Vue {
        @works.State
        public modalWorkCard!: WorkCard;

        constructor() {
            super();
        }

        get workCard() {
            return this.modalWorkCard;
        }

        get contact() {
            if (this.workCard && this.workCard.contact)
                return this.workCard.contact;
            return '';
        }

        set contact(value) {
            this.workCard.contact = value;
        }

        get companyType() {
            if (this.workCard && this.workCard.companyType)
                return this.workCard.companyType;
            return undefined;
        }

        set companyType(value) {
            this.workCard.companyType = value;
        }

        get licensePlate() {
            if (this.workCard && this.workCard.licensePlate)
                return this.workCard.licensePlate;
            return '';
        }

        set licensePlate(value) {
            this.workCard.licensePlate = value;
        }
    }
</script>

<style scoped>

</style>
