import Vue from "vue";
import Vuex, {Module as Mod} from 'vuex';
import Chart from 'chart.js';
import WorkCard from "@/utils/workCard/WorkCard";
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import PayChartPayloadInterface from "@/utils/interfaces/PayChartPayload.interface";
import DBConnector from "@/utils/firebase/DBConnector";
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
            colors: ['#388E3C', '#7b1fa2', '#fbc02d', '#f233ad'],
        };

        this.worksData.forEach((work: WorkCard) => {
            const paymentLabel = work.paymentInst ? work.paymentInst.label : 'אחר';
            let index = payload.labels.indexOf(paymentLabel);

            if (index === -1) {
                index = payload.labels.push(paymentLabel) - 1;
                payload.data[index] = 1;
                payload.colors[index] = work.paymentInst ? work.paymentInst.color : 'black';
                return;
            }

            payload.data[index] += 1;
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
