import Vue from "vue";
import Vuex from 'vuex';
import axios from 'axios';
import WorkCard from "../../../utils/workCard/WorkCard";
import WorkCardDTO from "@/utils/workCard/WorkCardDTO";
import DBConnector from "../../../utils/DBConnector/DBConnector";
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
// import worksData from "../../works.json";
Vue.use(Vuex);

@Module({namespaced: true})
class Works extends VuexModule {
    public worksData: Array<WorkCard> = [];
    public modalWorkCard?: WorkCard;

    get emptyWorkCard() {
        const lastId = this.worksData.length ? this.worksData[this.worksData.length - 1].id : null;

        return new WorkCard({
            id: lastId ? lastId + 1 : 1,
            date: Date.now(),
            contact: '',
            companyType: 1,
            licensePlate: '',
            workTime: 0,
            startWorkTime: '',
            endWorkTime: '',
            description: '',
            workPrice: 0,
            partsPrice: 0,
            partsCost: 0,
            paidSum: 0,
            paid: false,
            paymentInstrument: '',
            notes: ''
        });
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

        // worksData.data.forEach(workData => {
        //     const [day, month, year] = workData.date.split('/');
        //     workData.date = Date.parse(`${month}/${day}/${year}`);
        //
        //     dispatch('updateWork', new WorkCard(workData))
        // })
    }

    @Action
    newWork() {
        if (this.modalWorkCard) {
            this.context.commit('resetModalWorkCard', this.context.getters['emptyWorkCard']);
        }
    }

    @Action
    updateWork(workData: WorkCardDTO) {
        const existingWorkCard = this.worksData.filter((workCard: WorkCard) => {
            return workCard.id === workData.id;
        }).pop();

        DBConnector.worksCollection.child(String(workData.id)).update(workData);

        if (existingWorkCard) {
            this.context.commit('setUpdateWork', workData);
        } else {
            this.context.commit('addWork', workData)
        }

        this.context.commit('resetModalWorkCard', this.context.getters['emptyWorkCard']);

    }

    @Action
    editWork(workData: WorkCard) {
        this.context.commit('setModalWorkCard', workData);
    }

    @Action
    deleteWork(workData: WorkCard) {
        const existingWorkCard = this.worksData.filter((workCard: WorkCard) => {
            return workCard.id === workData.id;
        }).pop();

        if (existingWorkCard) {
            DBConnector.worksCollection.child(String(existingWorkCard.id)).remove();

            this.context.commit('setDeleteWork', existingWorkCard);
        }
    }

    @Mutation
    setWorks(works: WorkCard[]) {
        this.worksData = works;
    }

    @Mutation
    setModalWorkCard(workData: WorkCard) {
        Vue.set(this, 'modalWorkCard', workData);
    }

    @Mutation
    resetModalWorkCard(workData: WorkCard) {
        this.modalWorkCard = workData;
    }

    @Mutation
    setDeleteWork(workData: WorkCard) {
        const existingWorkCardIndex = this.worksData.findIndex((workCard: WorkCard) => {
            return workCard.id === workData.id;
        });

        this.worksData.splice(existingWorkCardIndex, 1);
    }

    @Mutation
    addWork(workData: WorkCard) {
        this.worksData.push(workData);
    }

    @Mutation
    setUpdateWork(workData: WorkCard) {
        const existingWorkCardIndex = this.worksData.findIndex((workCard: WorkCard) => {
            return workCard.id === workData.id;
        });

        if (existingWorkCardIndex >= 0) {
            Vue.set(this.worksData, existingWorkCardIndex, workData);
        } else {
            this.worksData.push(workData);
        }
    }
}

export default Works
