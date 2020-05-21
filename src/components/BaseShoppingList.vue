<template>
  <v-app>
    <v-row no-gutters>
      <v-col cols="4">
        <v-tabs 
          background-color="transparent"
          class="lists"
          :vertical="true" 
          :grow="true"
          dark
        >
          <v-tab 
            v-for="(list, i) in lists"
            @click="activeListIndex = i"
            class="justify-start mx-10" 
            :key="i"
          >
            <v-icon left>{{ list.icon }}</v-icon>
            {{ list.name }}
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col cols="8" class="pt-5 px-4">
        <v-text-field 
          class="mb-3" 
          label="Поиск..." 
          v-model="searchBar" 
          hide-details="auto" 
          background-color="white" 
          outlined
        />
        <div class="d-flex">
          <v-text-field 
            class="mb-3" 
            label="Добавить" 
            v-model="newProduct"
            background-color="white"
            outlined 
          />
          <v-btn x-large @click="addNewProduct" color="success" dark>Добавить</v-btn>
        </div>

        <v-list
          v-if="productList.length"
          dark
        >
          <v-list-item 
            v-for="(product, i) in productList"
            :key="i"
          >
            {{ product }}
            <v-btn 
              @click="deleteProduct(product)"
              class="ml-auto"
              color="error"
              outlined
              small>
              <v-icon center>mdi-trash-can-outline</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>

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
      this.newProduct = null
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
  .col-4 {
    background: url('https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-creative-food-festival-food-background-material-image_206773.jpg') center center no-repeat;
    background-size: cover;

    .lists {
      margin-top: 250px;
      padding: 0 100px;
    }
  }
</style>
