<template>
    <v-row>
        <v-dialog v-model="show"
                  max-width="600px"
                  persistent
        >
            <template v-slot:activator="{ on, attr }">
                <v-btn class="mx-sm-4" v-bind="attr" v-on="on" @click="add">
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
                            <v-col cols="12" lg="12">
                                <v-menu
                                        v-model="dateMenu"
                                        :close-on-content-click="false"
                                        transition="scale-transition"
                                        offset-y
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                v-model="workCard.dateString"
                                                label="* תאריך"
                                                hint="פורמט DD/MM/YYYY"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            v-model="date"
                                            no-title
                                            @input="dateMenu = false"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="איש קשר"
                                              v-model="workCard.contact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete label="חברה"
                                                :input="workCard.companyType"
                                                :items="['פרטי','יזמות','צבע ארגמן']"
                                                v-model="workCard.companyType"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="* לוחית רישוי"
                                              placeholder="XX-XXX-XX"
                                              v-model="workCard.licensePlate"
                                              required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="שעות עבודה"
                                              type="number"
                                              v-model="workCard.workTime"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-menu
                                        ref="startTimeMenu"
                                        v-model="startTimeMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="workCard.startTime"
                                        transition="scale-transition"
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                v-model="workCard.startTime"
                                                label="שעת התחלה"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                            v-if="startTimeMenu"
                                            v-model="startTime"
                                            format="24hr"
                                            full-width
                                            @click:minute="$refs.startTimeMenu.save(startTime)"
                                    ></v-time-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-menu
                                        ref="endTimeMenu"
                                        v-model="endTimeMenu"
                                        :close-on-content-click="false"
                                        :return-value.sync="workCard.endTime"
                                        transition="scale-transition"
                                        max-width="290px"
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                v-model="workCard.endTime"
                                                label="שעת התחלה"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-time-picker
                                            v-if="endTimeMenu"
                                            v-model="endTime"
                                            format="24hr"
                                            full-width
                                            @click:minute="$refs.endTimeMenu.save(endTime)"
                                    ></v-time-picker>
                                </v-menu>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field label="תיאור"
                                              hint="תיקון, טיפול, חילוץ"
                                              v-model="workCard.description"
                                              persistent-hint
                                              required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="* מחיר עבודה"
                                              type="number"
                                              v-model="workCard.workPrice"
                                              required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="* מחיר חלקים"
                                              type="number"
                                              v-model="workCard.partsPrice"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="הוצאות"
                                              type="number"
                                              hint="עלות החלקים כולל מע''מ"
                                              v-model="workCard.partsCost"
                                              persistent-hint
                                              required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="1">
                                <v-checkbox v-model="workCard.paid"
                                ></v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="5">
                                <v-text-field label="* שולם"
                                              v-model="workCard.paidSum"
                                              required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-autocomplete label="אמצעי תשלום"
                                                single
                                                v-model="workCard.paymentInst"
                                                :items="paymentSelectItems"
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="הערות"
                                              v-model="workCard.notes"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>* שדות חובה</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="show = false"
                            v-text="'Close'"
                    ></v-btn>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                            v-text="'Save'"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex';

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
                dateMenu : false,
                startTimeMenu : false,
                endTimeMenu : false,
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
        computed : {
            ...mapState({
                modalWorkCard : state => state.works.modalWorkCard,
            }),
            ...mapGetters({
                emptyWorkCard : 'works/emptyWorkCard'
            }),
            workCard() {
                if (this.modalWorkCard)
                    return this.modalWorkCard;

                return this.emptyWorkCard
            },
            show : {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            },
            date : {
                get() {
                    if (this.workCard && this.workCard.date)
                        return new Date(this.workCard.date).toISOString().substr(0, 10);

                    return new Date().toISOString().substr(0, 10);
                },
                set(value) {
                    this.workCard.date = Date.parse(value);
                }
            },
            startTime : {
                get() {
                    if (this.workCard && this.workCard.startTime)
                        return this.workCard.startTime;
                    return '';
                },
                set(value) {
                    this.workCard.startTime = value;
                }
            },
            endTime : {
                get() {
                    if (this.workCard && this.workCard.endTime)
                        return this.workCard.endTime;
                    return ''
                },
                set(value) {
                    this.workCard.endTime = value;
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
