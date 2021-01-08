<template>
    <v-row>
        <v-col cols="12" md="2" sm="6">
            <v-autocomplete :items="fileTypes"
                            :rules="rules.fileTypes"
                            label="סוג"
                            v-model="invoiceReceiptFileData.type"
            ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="3" sm="6">
            <v-text-field :rules="rules.invoiceNumber"
                          label="מספר מזהה"
                          required
                          type="number"
                          v-model="invoiceReceiptFileData.number"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" sm="12">
            <v-file-input :rules="rules.fileRequired"
                          :placeholder="invoiceReceiptFileData.name"
                          accept=".pdf"
                          @change="uploadFile"
                          label="קובץ חשבונית/קבלה"
                          dense
                          outlined
                          truncate-length="20"
            ></v-file-input>
        </v-col>
    </v-row>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Action} from 'vuex-class';
    import WorkCard from "@/utils/workCard/WorkCard";
    import InvoiceReceiptFileService from "@/utils/invoiceReceiptFile/invoiceReceiptFile.service";
    import InvoiceReceiptFileInterface from "@/utils/invoiceReceiptFile/invoiceReceiptFile.interface";
    import firebase from "firebase";
    import UploadTask = firebase.storage.UploadTask;

    @Component
    export default class WorkTaxInvoiceInput extends Vue {
        @Prop({required: true})
        public readonly workCard: WorkCard;
        public invoiceReceiptFileData!: InvoiceReceiptFileInterface;
        public fileTypes!: Array<{ text: string; value: string }>;

        created(): void {
            this.fileTypes = InvoiceReceiptFileService.types;
            this.invoiceReceiptFileData = InvoiceReceiptFileService.getInvRecFileByLink(this.workCard.invoiceReceiptLink);
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

        @Action('works/uploadInvoiceReceipt')
        public uploadInvoiceReceipt!: (payload: { data: InvoiceReceiptFileInterface; file: File }) => Promise<UploadTask>;

        public uploadFile(file: File) {
            if (file) {
                this.uploadInvoiceReceipt({
                    data: this.invoiceReceiptFileData,
                    file
                }).then((snapshot: any) => {
                    console.log(file.name + ' Uploaded!');
                    this.workCard.invoiceReceiptLink = snapshot.metadata.fullPath;
                });
            }
        }
    }
</script>
