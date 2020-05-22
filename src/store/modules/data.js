const state = {
    selectedListIndex: 0,
    lists: [{
        name:'Еда',
        icon: 'mdi-silverware-variant',
        items: [
            'Грибы',
            'Бананы',
            'Макароны'
        ]
    },{
        name:'Хоз. товары',
        icon: 'mdi-chemical-weapon',
        items: [
            'Мыло',
            'Шампунь',
            'Туалетная бумага'
        ]
    },{
        name:'Напитки',
        icon: 'mdi-cup',
        items: [
            'Сок',
            'Кола',
            'Энергетик',
        ]
    }]
};

const getters = {
    getSelectedList(state) {
        const list = state.lists[state.selectedListIndex]
        return list
    },
};

const mutations = {
    setStore(state) {
        if(localStorage.getItem('store')) {
            this.replaceState(
                {...state, ...JSON.parse(localStorage.getItem('store'))}
            );
        }
    },

    setLists(state, payload) {
        state.lists = payload
    },

    setSelectedList(state, payload) {
        state.selectedListIndex = payload
    },

    addNewProduct(state, payload) {
        const index = state.selectedListIndex
        const items = state.lists[index].items

        items.push(payload)
    },

    deleteProduct(state, payload) {
        const listIndex       = state.selectedListIndex
        const items           = state.lists[listIndex].items
        const selectedProduct = items.find(i => i == payload)
        const productIndex    = items.indexOf(selectedProduct)

        items.splice(productIndex, 1)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}