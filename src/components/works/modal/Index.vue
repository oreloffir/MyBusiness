<template>
    <div class="worksModalContainer">
        <v-dialog class="dialog"
                  v-model="show"
                  @click:outside="close"
                  persistent>
            <template #activator="{ on, attr }">
                <v-btn @click="add" class="newWorkButton mx-sm-4" v-bind="attr" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                    <span>הוסף עבודה חדשה</span>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">כרטיס עבודה חדשה</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <date-input></date-input>
                            <company-inputs></company-inputs>
                            <work-time-inputs></work-time-inputs>
                            <work-description-input></work-description-input>
                            <work-price-inputs></work-price-inputs>
                            <work-payment-inputs></work-payment-inputs>
                            <work-tax-invoice-input :key="workCard.id" v-show="workCard.paid"></work-tax-invoice-input>
                            <work-notes-input></work-notes-input>
                        </v-row>
                    </v-container>
                    <small>* שדות חובה</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            @click="close"
                            color="blue darken-1"
                            text
                            v-text="'Close'"
                    ></v-btn>
                    <v-btn
                            @click="save"
                            color="blue darken-1"
                            text
                            v-text="'Save'"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    // import NewWorkButton from './NewWorkButton'
    import DateInput from './DateInput'
    import CompanyInputs from './CompanyInputs'
    import WorkTimeInputs from './WorkTimeInputs'
    import WorkNotesInput from './WorkNotesInput'
    import WorkPriceInputs from './WorkPriceInputs'
    import WorkPaymentInputs from './WorkPaymentInputs'
    import WorkTaxInvoiceInput from "./WorkTaxInvoiceInputs"
    import WorkDescriptionInput from './WorkDescriptionInput'

    export default {
        name : "modal",
        props : {
            value : {
                type : Boolean,
                default : false
            },
        },
        components : {
            // NewWorkButton,
            WorkDescriptionInput,
            WorkTaxInvoiceInput,
            WorkPaymentInputs,
            WorkPriceInputs,
            WorkTimeInputs,
            WorkNotesInput,
            CompanyInputs,
            DateInput,
        },
        computed : {
            ...mapState({
                worksData : state => state.works.worksData,
                modalWorkCard : state => state.works.modalWorkCard,
                showModal : state => state.works.showModal,
            }),
            workCard() {
                return this.modalWorkCard;
            },
            show : {
                get() {
                    return this.showModal;
                },
                set(val) {
                    this.updateModal(val)
                }
            }
        },
        methods : {
            ...mapActions({
                addWork : 'works/newWork',
                saveWork : 'works/updateWork',
                updateModal : 'works/updateModal'
            }),
            add() {
                this.addWork(this.workCard);
            },
            save() {
                this.saveWork(this.workCard);
            },
            close() {
                this.updateModal(false)
            }
        }
    }
</script>

<style lang="scss">
    .worksModalContainer {
        .newWorkButton {
            position: absolute;
        }
    }

    .v-dialog {
        max-width: 600px;

        [class|=col] {
            padding-top: 4px;
            padding-bottom: unset;
        }
    }
</style>
