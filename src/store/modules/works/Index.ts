import Vue from "vue";
// import axios from 'axios';
import worksData from "../../works.json";
import WorkCard from "../../../utils/workCard/WorkCard";

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
    worksData: [],
    modalWorkCard: null,
};

// The module getters.
const getters = {
    modalWorkCard(state: VuexStateInterface, getters: VuexGettersInterface) {
        if(!state.modalWorkCard){
            return {...getters.emptyWorkCard}
        }

        return state.modalWorkCard;
    },
    emptyWorkCard(state: VuexStateInterface){
        const lastId = state.worksData.length ? state.worksData[state.worksData.length - 1].id : null;

        return new WorkCard(
            lastId ? lastId + 1 : 1,
            Date.now().toString(),
            '',
            1,
            'XX-XXX-XX',
            0,
            '',
            0,
            0,
            0,
            0,
            false,
            '',
            '');
    }
};

// The module actions.state
const actions = {
    initialize({dispatch}: VuexInterface){
        worksData.data.forEach(workData => {
            dispatch('updateWork', workData)
        })
    },
    newWork({state, commit, getters}: VuexInterface) {
        if (state.modalWorkCard) {
            commit('resetModalWorkCard', getters.emptyWorkCard);
        }
    },
    updateWork({state, commit, getters}: VuexInterface, workData: any) {
        const existingWorkCard = state.worksData.filter((workCard: WorkCard) => {
            return workCard.id === workData.id;
        }).pop();

        if (existingWorkCard) {
            commit('updateWork', workData);
        } else {
            commit('addWork', workData)
        }

        commit('resetModalWorkCard', getters.emptyWorkCard);

    },
    editWork({commit}: VuexInterface, workData: WorkCard) {
        commit('setModalWorkCard', workData);
    },
    deleteWork({commit}: VuexInterface, workData: any) {
        const existingWorkCard = state.worksData.filter((workCard: WorkCard) => {
            return workCard.id === workData.id;
        }).pop();

        if (existingWorkCard) {
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
    setWorks(state: any, works: WorkCard) {
        Vue.set(state, 'worksData', works);
    },
    setModalWorkCard(state: any, workData: WorkCard) {
        Vue.set(state, 'modalWorkCard', workData);
    },
    resetModalWorkCard(state: any, workData: WorkCard) {
        Vue.set(state, 'modalWorkCard', workData);
    },
    deleteWork(state: any, workData: WorkCard) {
        const existingWorkCardIndex = state.worksData.findIndex((workCard: WorkCard) => {
            return workCard.id === workData.id;
        });

        state.worksData.splice(existingWorkCardIndex, 1);
    },
    addWork(state: any, workData: WorkCard) {
        state.worksData.push({...workData});
    },
    updateWork(state: any, workData: WorkCard) {
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
