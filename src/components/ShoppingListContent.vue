<template>
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
        color="blue"
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
        :class="{'bought': product.bought}"
        :key="i"
      >
        <v-text-field 
          v-if="editedProductIndex == i" 
          v-model="editedProductData"
          @keyup.enter="saveNewProductData"
          :label="product.name"
          class="mb-0 mr-2"
          background-color="transparent"
          color="#fff"
          hide-details
          outlined 
        />
        <p v-else class="mb-0">{{ product.name }}</p>
        
        <div class="ml-auto d-flex">
          <v-btn 
            @click="toggleProductBoughtStatus(product.name)"
            class="mr-2"
            :color="getButtonColor(product.bought)"
            outlined
            small>
            <v-icon center>
              <template v-if="product.bought">mdi-cart-arrow-up</template>
              <template v-else>mdi-cart-arrow-down</template>
            </v-icon>
          </v-btn>

          <v-btn 
            color="primary"
            class="mr-2"
            outlined
            small>
            <v-icon 
              v-if="editedProductIndex == i"
              @click="saveNewProductData" 
              center>mdi-content-save</v-icon>
            <v-icon 
              v-else
              @click="editedProductIndex = i" 
              center>mdi-cog-refresh</v-icon>
          </v-btn>

          <v-btn 
            @click="deleteProduct(product.name)"
            color="error"
            outlined
            small>
            <v-icon center>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>
      </v-list-item>
    </v-list>

    <p v-else>Список пуст</p>
  </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      newProduct: null,
      searchBar: '',
      editedProductIndex: null,
      editedProductData: null
    }
  },

  computed: {
    ...mapGetters('data', ['getSelectedList', 'selectedListIndex']),

    productList() {
      const items = this.getSelectedList.items
      return items.filter(i => i.name.toLowerCase().includes(this.searchBar.toLowerCase()))
    }
  },

  methods: {
    addNewProduct() {
      this.$store.commit('data/addNewProduct', this.newProduct)
    },

    deleteProduct(name) {
      this.$store.commit('data/deleteProduct', name)
    },

    toggleProductBoughtStatus(name) {
      this.$store.commit('data/toggleProductBoughtStatus', name)
    },

    saveNewProductData() {
      this.$store.commit('data/editProduct', {name: this.editedProductData, index: this.editedProductIndex})
      this.editedProductIndex = null,
      this.editedProductData = null
    },

    getButtonColor(isBought) {
      return isBought ? 'warning' : 'success'
    }
  }
}
</script>

<style lang="scss">
  .bought {
    opacity: .35;
  }
</style>