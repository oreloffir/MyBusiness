<template>
    <div class="rowActionsWrapper">
        <v-icon @click="edit">mdi-briefcase-edit</v-icon>


        <v-dialog
                max-width="300"
                persistent
                v-model="removeDialog"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-icon
                        v-bind="attrs"
                        v-on="on"
                >mdi-delete-circle
                </v-icon>
            </template>
            <v-card>
                <v-card-title class="headline"
                              v-html="'האם אתה בטוח שאתה </br> רוצה למחוק את העבודה?'">

                </v-card-title>
                <v-card-text v-html="'לחץ DELETE למחיקה </br> לחץ CANCEL לביטול'">></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            @click="removeDialog = false"
                            color="green darken-1"
                            text
                    >
                        Cancel
                    </v-btn>
                    <v-btn
                            @click="remove"
                            color="red darken-1"
                            text
                    >
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Action} from "vuex-class"
    import WorkCard from "@/utils/workCard/WorkCard";

    @Component
    export default class TableRowActionsColumn extends Vue {
        @Prop({required: true}) readonly workCard: WorkCard;
        removeDialog: boolean;

        constructor() {
            super();
            this.removeDialog = false;
        }

        edit() {
            this.editWork(this.workCard);
        }

        remove() {
            this.deleteWork(this.workCard)
        }

        @Action('works/editWork')
        editWork!: (workCard: WorkCard) => void;

        @Action('works/deleteWork')
        deleteWork!: (workCard: WorkCard) => void;
    }
</script>

<style scoped>

</style>
