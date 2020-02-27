const state = {
    units: ['шт.', 'кг.', 'бан.', 'л.'],
    selectedListIndex: 0,
    sortingOrder: 'AZ',
    lists: [
        {
            name: 'Первый',
            products: [
                {
                    name: 'Хлеб',
                    count: 1,
                    unit: 'шт.',
                    bought: false
                },
                {
                    name: 'Конфеты',
                    count: 2,
                    unit: 'кг.',
                    bought: false
                }
            ]
        },
        {
            name: 'Второй',
            products: [
                {
                    name: 'Картошка',
                    count: 1,
                    unit: 'кг.',
                    bought: false
                },
                {
                    name: 'Пиво',
                    count: 2,
                    unit: 'бан.',
                    bought: false
                }
            ]
        },
    ],
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

    addNewList(state, payload) {
        state.lists.push(payload)
        state.selectedListIndex = state.lists.length - 1
    },

    addNewProduct(state, payload) {
        const index = state.selectedListIndex
        const products = state.lists[index].products

        products.push(payload)
    },

    editList(state, payload) {
        const list = state.lists[state.selectedListIndex]
        list.name = payload
    },

    editProduct(state, payload) {
        const listIndex = state.selectedListIndex
        const products = state.lists[listIndex].products

        products[payload.index] = payload.data
    },

    deleteList(state) {
        state.lists.splice(state.selectedListIndex, 1)
        state.selectedListIndex = null
    },

    deleteProduct(state, payload) {
        const listIndex       = state.selectedListIndex
        const products        = state.lists[listIndex].products
        const selectedProduct = products.find(i => i.name == payload)
        const productIndex    = products.indexOf(selectedProduct)

        products.splice(productIndex, 1)
    },

    toggleProductBoughtStatus(state, payload) {
        const index           = state.selectedListIndex
        const products        = state.lists[index].products
        const selectedProduct = products.find(i => i.name == payload)

        selectedProduct.bought = !selectedProduct.bought
    },

    sortSelectedList(state) {
        const index = state.selectedListIndex
        let products = state.lists[index].products

        if (!state.sortingOrder) state.sortingOrder = 'AZ'

        if (state.sortingOrder == 'AZ') {
            products.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
            state.sortingOrder = 'ZA'
        } else {
            products.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            state.sortingOrder = 'AZ'
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
