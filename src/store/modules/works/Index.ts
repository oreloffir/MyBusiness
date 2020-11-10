import Vue from "vue";
// import axios from 'axios';
import worksData from "../../works.json";
import WorkCard from "../../../utils/workCard/WorkCard";

// Indicates if the module is namespaced.
const namespaced = true;

// The module state.
const state = {
    worksData: worksData.data || [],
    modalWorkCard: null,
};

// The module getters.
const getters = {
    modalWorkCard(state, getters) {
        if(!state.modalWorkCard){
            return {...getters.emptyWorkCard}
        }

        return state.modalWorkCard;
    },
    emptyWorkCard(state){
        const lastId = state.worksData ? state.worksData[state.worksData.length - 1].id : null;

        return new WorkCard(
            lastId ? lastId + 1 : null,
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
    newWork({state, commit, getters}) {
        if (state.modalWorkCard) {
            commit('resetModalWorkCard', getters.emptyWorkCard);
        }
    },
    updateWork({state, commit, getters}, workData: any) {
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
    editWork({commit}, workData: WorkCard) {
        commit('setModalWorkCard', workData);
    },
    deleteWork({commit}, workData: any) {
        const existingWorkCard = state.worksData.filter((workCard) => {
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
        const existingWorkCardIndex = state.worksData.findIndex((workCard: any) => {
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
