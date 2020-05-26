const state = {
    selectedListIndex: 0,
    lists: [{
        name:'Еда',
        icon: 'mdi-silverware-variant',
        items: [
            {name: 'Грибы', bought: false},
            {name: 'Бананы', bought: false},
            {name: 'Макароны', bought: false},
        ]
    },{
        name:'Хоз. товары',
        icon: 'mdi-chemical-weapon',
        items: [
            {name: 'Мыло', bought: false},
            {name: 'Шампунь', bought: false},
            {name: 'Туалетная бумага', bought: false},
        ]
    },{
        name:'Напитки',
        icon: 'mdi-cup',
        items: [
            {name: 'Сок', bought: false},
            {name: 'Кола', bought: false},
            {name: 'Энергетик', bought: false},
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

    toggleProductBoughtStatus(state, payload) {
        const index           = state.selectedListIndex
        const items           = state.lists[index].items
        const selectedProduct = items.find(i => i.name == payload)

        selectedProduct.bought = !selectedProduct.bought
    },

    addNewProduct(state, payload) {
        const index = state.selectedListIndex
        const items = state.lists[index].items

        items.push({name: payload, bought: false})
    },

    editProduct(state, payload) {
        const listIndex = state.selectedListIndex
        const items = state.lists[listIndex].items

        items[payload.index].name = payload.name
    },

    deleteProduct(state, payload) {
        const listIndex       = state.selectedListIndex
        const items           = state.lists[listIndex].items
        const selectedProduct = items.find(i => i.name == payload)
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