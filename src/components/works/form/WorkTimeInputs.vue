<template>
    <v-row class="workTimeInputsContainer">
        <v-col cols="12" md="4" sm="4">
            <v-text-field
                    label="שעות עבודה"
                    type="number"
                    v-model="workCard.workTime"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="4" sm="4">
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
                        @click:minute="$refs.startTimeMenu.save(workCard.startWorkTime)"
                        format="24hr"
                        full-width
                        v-if="startTimeMenu"
                        v-model="workCard.startWorkTime"
                ></v-time-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" md="4" sm="4">
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
                            label="שעת סיום"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-model="workCard.endWorkTime"
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                        @click:minute="$refs.endTimeMenu.save(workCard.endWorkTime)"
                        format="24hr"
                        full-width
                        v-if="endTimeMenu"
                        v-model="workCard.endWorkTime"
                ></v-time-picker>
            </v-menu>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import WorkCard from "@/utils/workCard/WorkCard";

    @Component
    export default class WorkTimeInputs extends Vue {
        @Prop({required: true})
        public readonly workCard: WorkCard;
        public startTimeMenu = false;
        public endTimeMenu = false;
    }
</script>

<style scoped></style>
