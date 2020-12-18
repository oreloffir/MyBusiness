<template>
    <v-row>
        <v-col cols="12" md="2" sm="6">
            <v-autocomplete :items="fileTypes"
                            :rules="rules.fileTypes"
                            label="סוג"
                            v-model="selectedFileType"
            ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3" sm="6">
            <v-text-field :rules="rules.invoiceNumber"
                          label="מספר מזהה"
                          required
                          type="number"
                          v-model="invoiceNumber"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
            <v-file-input :rules="rules.fileRequired"
                          @change="uploadFile"
                          label="קובץ חשבונית/קבלה"
                          outlined
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
    export default class WorkTaxInvoiceInput extends Vue {
        @works.State
        public modalWorkCard!: WorkCard;
        public invoiceNumber!: string;
        public selectedFileType!: string;
        public fileTypes!: Array<{ text: string; value: string }>;

        created(): void {
            this.fileTypes = [
                {
                    text: 'קבלה',
                    value: 'Receipt'
                },
                {
                    text: 'חשבונית',
                    value: 'invoice'
                }
            ];
            this.invoiceNumber = this.workCard.taxInvoice;
            this.selectedFileType = this.workCard.taxInvoice;
        }

        get workCard() {
            return this.modalWorkCard;
        }

        get rules() {
            return {
                invoiceNumber: [
                    (value: string) => !!value || 'חובה',
                    (value: string) => (value || '').length === 5 || 'חובה 5 ספרות',
                    (value: string) => {
                        const pattern = /^([1,2,3][0-9]{4})$/;
                        return pattern.test(value) || 'מספר לא תקין'
                    },
                ],
                fileTypes: [(value: string) => !!value || 'חובה'],
                fileRequired: [(value: string) => !!value || 'חובה']
            };
        }

        public uploadFile(files: File) {
            console.log('uploadFile', files);
        }
    }
</script>
