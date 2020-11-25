<template>
    <v-row class="workTimeInputsContainer">
        <v-col cols="12" md="4" sm="6">
            <v-text-field label="שעות עבודה"
                          type="number"
                          v-model="workCard.workTime"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-menu
                    :close-on-content-click="false"
                    :return-value.sync="workCard.startWorkTime"
                    max-width="290px"
                    min-width="290px"
                    ref="startTimeMenu"
                    transition="scale-transition"
                    v-model="startTimeMenu"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                            label="שעת התחלה"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-model="workCard.startWorkTime"
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                        @click:minute="$refs.startTimeMenu.save(startWorkTime)"
                        format="24hr"
                        full-width
                        v-if="startTimeMenu"
                        v-model="startWorkTime"
                ></v-time-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" md="4" sm="6">
            <v-menu
                    :close-on-content-click="false"
                    :return-value.sync="workCard.endWorkTime"
                    max-width="290px"
                    min-width="290px"
                    ref="endTimeMenu"
                    transition="scale-transition"
                    v-model="endTimeMenu"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                            label="שעת התחלה"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-model="workCard.endWorkTime"
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                        @click:minute="$refs.endTimeMenu.save(endWorkTime)"
                        format="24hr"
                        full-width
                        v-if="endTimeMenu"
                        v-model="endWorkTime"
                ></v-time-picker>
            </v-menu>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";

    const works = namespace('works');

    @Component
    export default class WorkTimeInputs extends Vue {
        @works.State
        public modalWorkCard!: WorkCard;
        public startTimeMenu = false;
        public endTimeMenu = false;

        get workCard() {
            return this.modalWorkCard;
        }

        get startWorkTime() {
            if (this.workCard && this.workCard.startWorkTime)
                return this.workCard.startWorkTime;
            return '';
        }

        set startWorkTime(value) {
            this.workCard.startWorkTime = value;
        }

        get endWorkTime() {
            if (this.workCard && this.workCard.endWorkTime)
                return this.workCard.endWorkTime;
            return undefined;
        }

        set endWorkTime(value) {
            this.workCard.endWorkTime = value;
        }
    }
</script>

<style scoped>

</style>
