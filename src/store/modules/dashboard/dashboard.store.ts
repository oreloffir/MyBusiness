import Vue from "vue";
import axios from 'axios';
import Vuex, {Module as Mod} from 'vuex';
import Chart from 'chart.js';
import WorkCard from "@/utils/workCard/WorkCard";
import WorkCardDTO from "@/utils/workCard/WorkCardDTO";
// import DBConnector from "@/utils/DBConnector/DBConnector";
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import PayChartPayloadInterface from "@/utils/interfaces/PayChartPayload.interface";

Vue.use(Vuex);

@Module({namespaced: true})
class Works extends VuexModule {
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

        this.worksData.forEach((work) => {
            const paymentLabel = work.paymentInst ? work.paymentInst.text : 'אחר';
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
        axios.get('https://mybusiness-49812.firebaseio.com/works.json')
            .then(res => {
                const worksData = Array<WorkCard>();

                res.data.forEach((workData: WorkCardDTO) => {
                    if (workData) {
                        worksData.push(new WorkCard(workData));
                    }
                });

                return this.context.commit('setWorks', worksData);
            });
    }

    @Mutation
    setWorks(works: WorkCard[]) {
        Vue.set(this, 'worksData', works);
    }
}

export default Works
