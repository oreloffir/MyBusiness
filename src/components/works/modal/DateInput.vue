<template>
    <v-col cols="12" lg="12">
        <v-menu
                :close-on-content-click="false"
                max-width="290px"
                min-width="290px"
                transition="scale-transition"
                v-model="dateMenu"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                        hint="פורמט DD/MM/YYYY"
                        label="* תאריך"
                        readonly
                        v-bind="attrs"
                        v-model="workCard.dateString"
                        v-on="on"
                ></v-text-field>
            </template>
            <v-date-picker
                    @input="dateMenu = false"
                    no-title
                    v-model="date"
            ></v-date-picker>
        </v-menu>
    </v-col>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";

    const works = namespace('works');

    @Component
    export default class DateInput extends Vue {
        @works.State
        public modalWorkCard!: WorkCard;
        public dateMenu = false;

        constructor() {
            super();
        }

        get workCard() {
            return this.modalWorkCard;
        }

        get date() {
            if (this.workCard && this.workCard.date)
                return new Date(this.workCard.date).toISOString().substr(0, 10);

            return new Date().toISOString().substr(0, 10);
        }

        set date(value) {
            this.workCard.date = Date.parse(value);
        }
    }
</script>
