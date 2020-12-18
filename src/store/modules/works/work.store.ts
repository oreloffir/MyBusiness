import Vue from "vue";
import Vuex, {Module as Mod} from 'vuex';
import WorkCard from "@/utils/workCard/WorkCard";
import WorksTable from "@/utils/worksTable/WorksTable";
import DBConnector from "@/utils/firebase/DBConnector";
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators'
import firebase from "firebase"
import DataSnapshot = firebase.database.DataSnapshot;
// import worksData from "../../ExcelWorks.json";

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
        this.worksData.push(this.modalWorkCard);
    }

    get emptyWorkCard() {
        const worksDataMaxId = this.worksData.length ? Math.max(...this.worksData.map(work => work.id)) : null;
        const lastId = worksDataMaxId ? worksDataMaxId + 1 : 9999;

        return new WorkCard({
            id: lastId,
            date: Date.now()
        });
    }

    @Action
    initialize() {
        DBConnector.worksCollection.once('value', (snap: DataSnapshot) => {
            const worksData = Array<WorkCard>();

            snap.forEach((workData: DataSnapshot) => {
                if (workData) {
                    worksData.push(new WorkCard(workData.val()));
                }
            });

            this.context.commit('setWorks', worksData.reverse());
        });

        // worksData.works.forEach(workData => {
        //     console.log(workData);
        //     const [day, month, year] = workData.date.split('/');
        //     workData.date = Date.parse(`${month}/${day}/${year}`);
        //
        //     this.context.dispatch('updateWork', new WorkCard(workData))
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

        DBConnector.worksCollection.child(String(workData.id)).update(workData.firebaseObject).then(() => {
            if (existingWorkCard) {
                this.context.commit('setUpdateWork', workData);
            } else {
                this.context.commit('addWork', workData);
            }

            this.context.commit('setShowModal', false);
            this.context.commit('resetModalWorkCard', this.context.getters['emptyWorkCard']);
        }).catch((err: Error) => alert("שגיאה בזמן שמירה\n" + err));
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
            DBConnector.worksCollection.child(String(existingWorkCard.id)).remove().then(() => {
                this.context.commit('setDeleteWork', existingWorkCard);
            }).catch((err: Error) => alert("שגיאה בזמן מחיקה\n" + err));
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
