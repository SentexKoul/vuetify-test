<template>
  <v-app>
    <v-row class="mt-5" no-gutters>
      <v-col cols="4 mt-10 pt-10">
        <v-tabs :vertical="true" :grow="true">
          <v-tab 
            v-for="(list, i) in lists"
            @click="activeListIndex = i"
            class="justify-end pr-10" 
            :key="i"
          >
            <v-icon left>{{ list.icon }}</v-icon>
            {{ list.name }}
          </v-tab>
        </v-tabs>
      </v-col>


      <v-col cols="8">
        <v-text-field class="mb-3 mr-5" label="Поиск..." v-model="searchBar" hide-details="auto" outlined/>
        <div class="d-flex">
          <v-text-field class="mb-3" label="Добавить" v-model="newProduct" outlined />
          <v-btn x-large @click="addNewProduct" class="mr-5" color="success" dark>Добавить</v-btn>
        </div>

        <v-tabs v-if="productList.length" :vertical="true" :grow="true">
          <v-tab 
            v-for="(product, i) in productList" 
            class="justify-space-between"
            :key="i"
          >
            {{ product }}
            <v-btn @click="deleteProduct(product)" small color="error">Удалить</v-btn>
          </v-tab>
        </v-tabs>

        <p v-else>Список пуст</p>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      activeListIndex: 0,
      newProduct: null,
      searchBar: '',
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
    }
  },

  computed: {
    productList() {
      const items = this.lists[this.activeListIndex].items
      return items.filter(i => i.toLowerCase().includes(this.searchBar.toLowerCase()))
    }
  },

  methods: {
    addNewProduct() {
      const items = this.lists[this.activeListIndex].items
      items.push(this.newProduct)
    },

    deleteProduct(product) {
      const items           = this.lists[this.activeListIndex].items
      const selectedProduct = items.find(i => i == product)
      const productIndex    = items.indexOf(selectedProduct)

      items.splice(productIndex, 1)
    },
  }
}
</script>

<style lang="scss">
</style>
