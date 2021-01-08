<template>
    <div class="rowActionsWrapper">
        <!--Delete work icon + modal-->
        <v-dialog
                max-width="300"
                persistent
                v-model="removeDialog"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="error"
                       v-bind="attrs"
                       v-on="on"
                >
                    <v-icon color="white">mdi-delete-circle</v-icon>
                    מחיקה
                </v-btn>
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

        <!--Tax invoice link icon-->
        <v-btn v-if="workCard.invoiceReceiptLink">
            <a @click.prevent="openInvoice"
               color="blue darken-1"
               target="popup"
            >
                <v-icon>mdi-notebook-check</v-icon>
                חשבונית מס
            </a>
        </v-btn>

        <!--Image link icon-->
        <v-btn v-if="workCard.imageLink">
            <a @click.prevent="openImage"
               target="popup"
            >
                <v-icon>mdi-file-image-outline</v-icon>
                תמונה
            </a>
        </v-btn>

        <!--Update work button-->
        <v-btn color="green"
               @click="save(item)">
            <v-icon>mdi-briefcase-edit</v-icon>
            שמור
        </v-btn>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Action} from "vuex-class"
    import WorkCard from "@/utils/workCard/WorkCard";

    @Component
    export default class TableRowActionsColumn extends Vue {
        @Prop({required: true})
        public readonly workCard: WorkCard;
        removeDialog: boolean;

        constructor() {
            super();
            this.removeDialog = false;
        }

        edit() {
            this.updateWork(this.workCard);
        }

        remove() {
            this.deleteWork(this.workCard)
        }

        openInvoice() {
            this.workCard.openInvoice();
        }

        openImage() {
            this.workCard.openImage();
        }

        @Action('works/updateWork')
        updateWork!: (workCard: WorkCard) => void;

        @Action('works/deleteWork')
        deleteWork!: (workCard: WorkCard) => void;
    }
</script>

<style lang="scss" scoped>
    .rowActionsWrapper {
        width: 100%;
        text-align: left;

        .v-btn {
            margin-right: 10px;

            a {
                text-decoration: none;
            }
        }
    }
</style>
