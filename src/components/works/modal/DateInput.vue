<template>
    <v-row>
        <v-col cols="12" md="4" sm="12">
            <v-menu v-model="dateMenu"
                    :close-on-content-click="false"
                    max-width="290px"
                    min-width="290px"
                    transition="scale-transition"
            >
                <template #activator="{ on, attrs }">
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

        <v-col cols="12" md="1" offset-md="6" sm="1">
            <v-icon @click="copy"
                    color="primary"
                    large
                    style="line-height: 2;"
            >
                mdi-telegram
            </v-icon>
        </v-col>
        <v-col cols="12" md="1" sm="1">
            <v-file-input @change="uploadImage"
                          hide-input
                          prepend-icon="mdi-camera-plus"
            ></v-file-input>
        </v-col>
    </v-row>
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

        copy() {
            navigator.clipboard.writeText(this.workCard.toString());
        }

        uploadImage(file: File) {
            this.workCard.uploadImage(file);
        }
    }
</script>
