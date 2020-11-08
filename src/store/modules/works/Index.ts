import Vue from "vue";
// import axios from 'axios';
import worksData from "../../works.json";

// Indicates if the module is namespaced.
const namespaced = true;

// The module state.
const state = {
    worksData: worksData.data
};

// The module getters.
const getters = {
    modalWorkCard(state){
        console.log(state.worksData, state.worksData ? state.worksData[state.worksData.length -1].id : null);
        const  lastId = state.worksData ? state.worksData[state.worksData.length -1].id : null;

        return {
            id: lastId ? lastId + 1 : null,
            date: Date.now(),
            contact: null,
            companyType: 1,
            licensePlate: 'XX-XXX-XX',
            workTime: null,
            description: null,
            workPrice: 0,
            partsPrice: 0,
            partsCost: 0,
            paidSum: 0,
            paid: false,
            paymentInstrument: null,
            notes: null
        }
    }
};

// The module actions.state
const actions = {
    updateWork({state, commit}, workData: any) {
        const existingWorkCard = state.worksData.filter((workCard) => {
            return workCard.id === workData.id;
        }).pop();

        if (existingWorkCard) {
            commit('updateWork', workData);
        }else{
            commit('addWork', workData)
        }

        commit('resetModalWorkCard')
    },
    editWork({commit}, workData: any) {
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
     * @param sections
     */
    setWorks(state: any, works: object) {
        Vue.set(state, 'worksData', works);
    },
    setModalWorkCard(state: any, workData: object) {
        state.modalWorkCard = workData;
    },
    deleteWork(state: any, workData: object) {
        const existingWorkCardIndex = state.worksData.findIndex((workCard) => {
            return workCard.id === workData.id;
        });
        console.log('deleteWork', existingWorkCardIndex);
        state.worksData.splice(existingWorkCardIndex, 1);
    },
    addWork(state: any, workData: object) {
        state.worksData.push({...workData});
    },
    updateWork(state: any, workData: object) {
        const existingWorkCardIndex = state.worksData.findIndex((workCard) => {
            return workCard.id === workData.id;
        });

        if (existingWorkCardIndex >= 0){
            Vue.set(state.worksData, existingWorkCardIndex, workData);
        }else{
            state.worksData.push(workData);
        }
    },
    resetModalWorkCard(state: any) {
        state.modalWorkCard = {
            date: Date.now(),
            contact: null,
            companyType: 1,
            licensePlate: 'XX-XXX-XX',
            workTime: null,
            description: null,
            workPrice: 0,
            partsPrice: 0,
            partsCost: 0,
            paidSum: 0,
            paid: false,
            paymentInstrument: null,
            notes: null

        }
    },
};

// Export module.
export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
