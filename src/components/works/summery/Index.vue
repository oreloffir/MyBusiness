<template>
    <div class="worksSummeryContainer">
        <v-container class="text-center" fluid>
            <v-icon @click="show = !show" color="green darken-2" large>
                mdi-cash-usd
            </v-icon>
            <v-tooltip right v-model="show">
                <span>סה"כ {{sum}}</span>
            </v-tooltip>
        </v-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        name : "summery",
        data() {
            return {
                show : false
            }
        },
        computed : {
            ...mapState({
                worksData : state => state.works.worksData,
            }),
            sum() {
                let sum = 0;

                this.worksData.map((work) => {
                    if (parseInt(work.paidSum))
                        sum += parseInt(work.paidSum)
                });

                return sum;
            }
        },
        mounted() {
            console.log(this.value);
        }
    }
</script>
