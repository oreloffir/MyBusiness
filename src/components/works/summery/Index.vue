<template>
    <div class="worksSummeryContainer">
        <v-card :class="['summeryCard', {show}]"
                elevation="8"
                outlined
        >
            <v-row class="underline">
                <v-col lg="3" md="3" sm="3"><span>עבודה</span></v-col>
                <v-col lg="3" md="3" sm="3"><span>חלקים</span></v-col>
                <v-col lg="3" md="3" sm="3"><span>הוצאות</span></v-col>
                <v-col lg="3" md="3" sm="3"><span>שולם</span></v-col>
            </v-row>
            <v-row class="bold">
                <v-col lg="3" md="3" sm="3"><span>{{ sumsMap.get('workPrice')}}</span></v-col>
                <v-col lg="3" md="3" sm="3"><span>{{ sumsMap.get('partsPrice')}}</span></v-col>
                <v-col lg="3" md="3" sm="3"><span>{{ sumsMap.get('partsCost')}}</span></v-col>
                <v-col lg="3" md="3" sm="3"><span>{{ sumsMap.get('paidSum')}}</span></v-col>
            </v-row>
        </v-card>
        <v-btn @click="show = !show"
               elevation="5"
               icon
               outlined
               rounded
               x-large
        >
            <v-icon color="green darken-2" large>
                mdi-cash-usd
            </v-icon>
        </v-btn>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {namespace} from 'vuex-class';
    import WorksTable from "@/utils/worksTable/WorksTable";

    const works = namespace('works');

    @Component({
        name: 'Summery',
    })
    export default class Summery extends Vue {
        @works.State
        public worksTable: WorksTable;
        public sumsMap = new Map<string, number>();
        public show = false;

        constructor() {
            super();
        }

        @Watch('worksTable.displayedWorks')
        public updateSummery() {
            this.sumsMap = this.sums();
        }

        private sums(): Map<string, number> {
            const sums = new Map<string, number>();
            sums.set('paidSum', 0);
            sums.set('workPrice', 0);
            sums.set('partsPrice', 0);
            sums.set('partsCost', 0);

            if (!this.worksTable || !this.worksTable.displayedWorks)
                return sums;

            this.worksTable.displayedWorks.map((work) => {
                const workPrice = work.workPrice ? Number(work.workPrice) + Number(sums.get('workPrice')) : Number(sums.get('workPrice'));
                const partsPrice = work.partsPrice ? Number(work.partsPrice) + Number(sums.get('partsPrice')) : Number(sums.get('partsPrice'));
                const partsCost = work.partsCost ? Number(work.partsCost) + Number(sums.get('partsCost')) : Number(sums.get('partsCost'));
                const paidSum = work.paidSum ? Number(work.paidSum) + Number(sums.get('paidSum')) : Number(sums.get('paidSum'));

                sums.set('paidSum', paidSum ? paidSum : 0);
                sums.set('workPrice', workPrice ? workPrice : 0);
                sums.set('partsPrice', partsPrice ? partsPrice : 0);
                sums.set('partsCost', partsCost ? partsCost : 0);
            });

            return sums;
        }
    }
</script>

<style lang="scss">
    .worksSummeryContainer {
        position: absolute;
        top: 10px;
        left: 10px;

        &:hover {
            .summeryCard {
                display: block;
            }
        }

        .summeryCard {
            z-index: 100;
            position: absolute;
            display: none;
            left: 55px;
            min-width: 350px;
            padding: 5px;
            color: #fff;
            background-color: rgba(33, 150, 243, 0.9);

            .bold {
                font-weight: bold;
            }

            .underline {
                text-decoration: underline;
            }
        }
    }
</style>
