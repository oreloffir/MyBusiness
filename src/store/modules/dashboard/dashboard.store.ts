import Vue from "vue";
import Vuex, {Module as Mod} from 'vuex';
import Chart from 'chart.js';
import WorkCard from "@/utils/workCard/WorkCard";
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import PayChartPayloadInterface from "@/utils/interfaces/PayChartPayload.interface";
import DBConnector from "@/utils/firebase/DBConnector";
import firebase from "firebase"
import DataSnapshot = firebase.database.DataSnapshot;

Vue.use(Vuex);

@Module({namespaced: true})
class Dashboard extends VuexModule {
    public worksData: Array<WorkCard> = [];

    // eslint-disable-next-line
    constructor(module: Mod<{}, any>) {
        super(module);
    }

    get paymentInstrumentChartData() {
        const payload: PayChartPayloadInterface = {
            options: Chart.defaults.pie,
            data: [],
            labels: [],
            colors: [],
        };

        const paymentMap = new Map<string, { count: number; color: string }>();

        this.worksData.forEach((work: WorkCard) => {
            const paymentLabel = work.paymentInst ? work.paymentInst.label : 'אחר';
            const paymentColor = work.paymentInst ? work.paymentInst.color.split(' ')[0]: 'black';
            const workPaidAmount = work.sumPrice || 0;

            if (paymentMap.has(paymentLabel)) {
                paymentMap.get(paymentLabel)!.count += workPaidAmount;
            } else {
                paymentMap.set(paymentLabel, { count: workPaidAmount, color: paymentColor });
            }
        });


        paymentMap.forEach((value, key) => {
            payload.labels.push(key);
            payload.data.push(value.count);
            payload.colors.push(value.color);
        });

        return payload;
    }

    @Action
    initialize() {
        DBConnector.worksCollection.once('value', (snap) => {
            const worksData = Array<WorkCard>();

            snap.forEach((workData: DataSnapshot) => {
                if (workData) {
                    worksData.push(new WorkCard(workData.val()));
                }
            });

            this.context.commit('setWorks', worksData.reverse());
        });
    }

    @Mutation
    setWorks(works: WorkCard[]) {
        Vue.set(this, 'worksData', works);
    }
}

export default Dashboard
