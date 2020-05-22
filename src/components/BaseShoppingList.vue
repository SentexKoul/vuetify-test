<template>
  <v-app>
    <v-row no-gutters>
      <v-col cols="4">
        <shoppeng-list-aside/>
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
import ShoppengListAside from './ShoppengListAside'
import { mapGetters } from 'vuex';

export default {
  components: {
    ShoppengListAside
  },

  data() {
    return {
      newProduct: null,
      searchBar: '',
    }
  },

  computed: {
    ...mapGetters('data', ['getSelectedList', 'selectedListIndex']),

    productList() {
      const items = this.getSelectedList.items
      return items.filter(i => i.toLowerCase().includes(this.searchBar.toLowerCase()))
    }
  },

  methods: {
    addNewProduct() {
      this.$store.commit('data/addNewProduct', this.newProduct)
    },

    deleteProduct(product) {
      this.$store.commit('data/deleteProduct', product)
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
