<template>
    <div class="worksModalContainer">
        <v-dialog max-width="600px"
                  persistent
                  v-model="show"
        >
            <template v-slot:activator="{ on, attr }">
                <v-btn @click="add" class="mx-sm-4" v-bind="attr" v-on="on">
                    <v-icon>mdi-plus</v-icon>
                    <span>הוסף עבודה חדשה</span>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">הוסף עבודה חדשה</span>
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
                            <work-notes-input></work-notes-input>
                        </v-row>
                    </v-container>
                    <small>* שדות חובה</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            @click="show = false"
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
    import WorkDescriptionInput from './WorkDescriptionInput'

    export default {
        name : "modal",
        props : {
            value : {
                type : Boolean,
                default : false
            },
        },
        data() {
            return {
                paymentSelectItems : [
                    {
                        value : "CHECK",
                        text : "צ'ק"
                    },
                    {
                        value : "CASH",
                        text : "מזומן"
                    },
                    {
                        value : "CREDIT_CARD",
                        text : "כרטיס אשראי"
                    },
                    {
                        value : "REMITTANCE",
                        text : "העברה בנקאית"
                    }
                ]
            }
        },
        components : {
            // NewWorkButton,
            WorkDescriptionInput,
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
            }),
            workCard() {
                return this.modalWorkCard;
            },
            show : {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            }
        },
        methods : {
            ...mapActions({
                addWork : 'works/newWork',
                saveWork : 'works/updateWork'
            }),
            add() {
                this.addWork(this.workCard);
                this.show = true;
            },
            save() {
                this.saveWork(this.workCard);
                this.show = false;
            }
        }
    }
</script>
