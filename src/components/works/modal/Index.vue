<template>
    <div class="worksModalContainer">
        <v-dialog class="dialog" v-model="show" @click:outside="close" persistent>
            <WorkForm :work="workCard">
                <template #actions>
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
                </template>
            </WorkForm>
        </v-dialog>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    // import NewWorkButton from './NewWorkButton'
    import WorkForm from '../form/Index'

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
            WorkForm
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

        [class|="col"] {
            padding-top: 4px;
            padding-bottom: unset;
        }
    }
</style>
