import Vue from "vue";
import axios from 'axios';
import Vuex, {Module as Mod} from 'vuex';
import WorkCard from "@/utils/workCard/WorkCard";
import WorkCardDTO from "@/utils/workCard/WorkCardDTO";
import WorksTable from "@/utils/worksTable/WorksTable";
import DBConnector from "@/utils/DBConnector/DBConnector";
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
// import worksData from "../../works.json";
Vue.use(Vuex);

@Module({namespaced: true})
class Works extends VuexModule {
    public showModal: boolean;
    public modalWorkCard?: WorkCard;
    public worksTable?: WorksTable;
    public worksData: Array<WorkCard> = [];

    // eslint-disable-next-line
    constructor(module: Mod<{}, any>) {
        super(module);
        this.showModal = false;
        this.modalWorkCard = this.emptyWorkCard;
        this.worksData.push(this.modalWorkCard)
    }

    get emptyWorkCard() {
        const lastId = this.worksData.length ? this.worksData[this.worksData.length - 1].id : null;

        return new WorkCard({
            id: lastId ? lastId + 1 : 1,
            date: Date.now()
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
    updateWork(workData: WorkCard) {
        const existingWorkCard = this.worksData.filter((workCard: WorkCard) => {
            return workCard.id === workData.id;
        }).pop();

        DBConnector.worksCollection.child(String(workData.id)).update(workData.firebaseObject).then(res => {
            if (existingWorkCard) {
                this.context.commit('setUpdateWork', workData);
            } else {
                this.context.commit('addWork', workData);
            }

            this.context.commit('setShowModal', false);
            this.context.commit('resetModalWorkCard', this.context.getters['emptyWorkCard']);
        }).catch(err => alert("שגיאה בזמן שמירה\n" + err));
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
            DBConnector.worksCollection.child(String(existingWorkCard.id)).remove().then(res => {
                this.context.commit('setDeleteWork', existingWorkCard);
            }).catch(err => alert("שגיאה בזמן מחיקה\n" + err));
        }
    }

    @Action
    updateModal(flag: boolean) {
        this.context.commit('setShowModal', flag);
    }

    @Mutation
    setShowModal(flag: boolean) {
        Vue.set(this, 'showModal', flag);
    }

    @Mutation
    setWorks(works: WorkCard[]) {
        Vue.set(this, 'worksData', works);
        Vue.set(this, 'worksTable', new WorksTable(works));
    }

    @Mutation
    setModalWorkCard(workData: WorkCard) {
        Vue.set(this, 'showModal', true);
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
