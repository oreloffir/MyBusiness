<template>
    <v-row>
        <v-dialog v-model="show"
                  max-width="600px"
                  persistent
        >
            <template v-slot:activator="{ on, attr }">
                <v-btn class="mx-sm-4" v-bind="attr" v-on="on" @click="show = true">
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
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="* תאריך"
                                        v-model="workCard.date"
                                        :input="dateString"
                                        required
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="איש קשר"
                                              v-model="workCard.contact"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-select label="חברה"
                                          :items="['פרטי','יזמות','צבע ארגמן']"
                                          v-model="workCard.companyType"
                                          :input="workCard.companyType"
                                          persistent-hint
                                          required
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="* לוחית רישוי"
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
                                              v-model="workCard.partsCost"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field label="הוצאות"
                                              type="number"
                                              hint="עלות החלקים כולל מע''מ"
                                              v-model="workCard.partsPrice"
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
                                                v-model="workCard.paymentInstrument"
                                                :items="['מזומן', 'צק', 'העברה', 'אשראי']"
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
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name : "modal",
        props : {
            value : {
                type : Boolean,
                default : false
            },
        },
        data() {
            return {}
        },
        computed : {
            ...mapGetters({
                workCard : 'works/modalWorkCard'
            }),
            show : {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                }
            },
            dateString() {
                return new Date(this.workCard.date).toLocaleDateString();
            }
        },
        methods : {
            ...mapActions({
                saveWork : 'works/updateWork'
            }),
            save() {
                this.saveWork(this.workCard);
                this.show = false;
            },
        }
    }
</script>
