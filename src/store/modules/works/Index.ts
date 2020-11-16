import Vue from "vue";
import axios from 'axios';
// import worksData from "../../works.json";
import WorkCard from "../../../utils/workCard/WorkCard";
import WorkCardDTO from "@/utils/workCard/WorkCardDTO";
import DBConnector from "../../../utils/DBConnector/DBConnector";

interface VuexStateInterface {
    worksData: Array<WorkCard>;
    modalWorkCard: WorkCard;
}

interface VuexGettersInterface {
    modalWorkCard: Record<string, WorkCard>;
    emptyWorkCard: Record<string, WorkCard>;
}

interface VuexInterface {
    commit: Function;
    dispatch: Function;
    getters: VuexGettersInterface;
    state: VuexStateInterface;
}

// Indicates if the module is namespaced.
const namespaced = true;

// The module state.
const state = {
    worksData: new Array<WorkCard>(),
    modalWorkCard: null,
};

// The module getters.
const getters = {
    modalWorkCard(state: VuexStateInterface, getters: VuexGettersInterface) {
        if (!state.modalWorkCard) {
            return {...getters.emptyWorkCard}
        }

        return state.modalWorkCard;
    },
    emptyWorkCard(state: VuexStateInterface) {
        const lastId = state.worksData.length ? state.worksData[state.worksData.length - 1].id : null;
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
};

// The module actions.state
const actions = {
    initialize({dispatch}: VuexInterface) {
        axios.get('https://mybusiness-49812.firebaseio.com/works.json')
            .then(res => {
                return res.data.forEach((workData: WorkCardDTO) => {
                    if (workData) {
                        dispatch('updateWork', new WorkCard(workData));
                    }
                });
            });

        // worksData.data.forEach(workData => {
        //     const [day, month, year] = workData.date.split('/');
        //     workData.date = Date.parse(`${month}/${day}/${year}`);
        //
        //     dispatch('updateWork', new WorkCard(workData))
        // })
    },
    newWork({state, commit, getters}: VuexInterface) {
        if (state.modalWorkCard) {
            commit('resetModalWorkCard', getters.emptyWorkCard);
        }
    },
    updateWork({state, commit, getters}: VuexInterface, workData: WorkCardDTO) {
        const existingWorkCard = state.worksData.filter((workCard: WorkCard) => {
            return workCard.id === workData.id;
        }).pop();

        DBConnector.worksCollection.child(String(workData.id)).update(workData);

        if (existingWorkCard) {
            commit('updateWork', workData);
        } else {
            commit('addWork', workData)
        }

        commit('resetModalWorkCard', getters.emptyWorkCard);

    },
    editWork({commit}: VuexInterface, workData: WorkCard) {
        // const existingWorkCard = workData;

        commit('setModalWorkCard', workData);
    },
    deleteWork({commit}: VuexInterface, workData: WorkCard) {
        const existingWorkCard = state.worksData.filter((workCard: WorkCard) => {
            return workCard.id === workData.id;
        }).pop();

        if (existingWorkCard) {
            DBConnector.worksCollection.child(String(existingWorkCard.id)).remove();

            commit('deleteWork', existingWorkCard);
        }
    }
};

// The module mutations.
const mutations = {
    /**
     * Set all the section from server to store.
     *
     * @param state
     * @param works
     */
    setWorks(state: VuexStateInterface, works: WorkCard) {
        Vue.set(state, 'worksData', works);
    },
    setModalWorkCard(state: VuexStateInterface, workData: WorkCard) {
        Vue.set(state, 'modalWorkCard', workData);
    },
    resetModalWorkCard(state: VuexStateInterface, workData: WorkCard) {
        Vue.set(state, 'modalWorkCard', workData);
    },
    deleteWork(state: VuexStateInterface, workData: WorkCard) {
        const existingWorkCardIndex = state.worksData.findIndex((workCard: WorkCard) => {
            return workCard.id === workData.id;
        });

        state.worksData.splice(existingWorkCardIndex, 1);
    },
    addWork(state: VuexStateInterface, workData: WorkCard) {
        state.worksData.push(workData);
    },
    updateWork(state: VuexStateInterface, workData: WorkCard) {
        const existingWorkCardIndex = state.worksData.findIndex((workCard: WorkCard) => {
            return workCard.id === workData.id;
        });

        if (existingWorkCardIndex >= 0) {
            Vue.set(state.worksData, existingWorkCardIndex, workData);
        } else {
            state.worksData.push(workData);
        }
    }
};

// Export module.
export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
