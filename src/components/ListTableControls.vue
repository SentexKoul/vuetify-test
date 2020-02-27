<template>
  <div v-if="getSelectedList" class="table-controls-wrapper">
    <b-row>
      <b-col cols="6">
        <b-form-input 
          v-model="newProduct.name" 
          type="text" 
          placeholder="Продукт"
        />
      </b-col>
      <b-col cols="2">
        <b-form-input 
          v-model="newProduct.count" 
          type="number" 
          placeholder="Кол-во"
        />
      </b-col>
      <b-col cols="2">
        <b-form-select 
          v-model="newProduct.unit" 
          :options="units"
        />
      </b-col>

      <b-col cols="2">
        <b-button
          @click="addNewProduct"
          variant="secondary"
          block
        >
          +
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ListTableControls',

  data() {
    return {
      newProduct: {
        name: null,
        count: null,
        unit: 'шт.'
      }
    }
  },

  computed: {
    ...mapGetters('data', ['getSelectedList']),
    ...mapState('data', ['units']),
  },

  methods: {
    addNewProduct() {
      if (!this.newProduct.name) return
      
      this.$store.commit('data/addNewProduct', {...this.newProduct, bought: false})
      this.newProduct = {
        name: null,
        count: null,
        unit: 'шт.'
      }
    },
  }
}
</script>

<style lang="scss">
</style>