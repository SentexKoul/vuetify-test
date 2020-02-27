<template>
  <b-container>
    <list-header @search="updateSearchValue"/>

    <b-row v-if="lists.length" class="text-center">
      <b-col cols="4">
        <list-navigation/>
        <list-custom-data/>
      </b-col>
      <b-col>
        <list-table :search="search"/>
        <list-table-controls/>
      </b-col>
    </b-row>

    <p v-else>У вас пока нет списков покупок, нажмите "Доб. список", чтобы добавить первый</p>
  </b-container>
</template>

<script>
import ListHeader from '@/components/ListHeader'
import ListNavigation from '@/components/ListNavigation'
import ListTable from '@/components/ListTable'
import ListTableControls from '@/components/ListTableControls'
import ListCustomData from '@/components/ListCustomData'
import {mapState} from 'vuex'

export default {
  name: 'ShoppingList',

  components: { 
    ListHeader,
    ListNavigation,
    ListTable,
    ListTableControls,
    ListCustomData
  },

  data() {
    return {
      search: null
    }
  },

  computed: {
    ...mapState('data', ['lists'])
  },

  methods: {
    updateSearchValue(value) {
      this.search = value
    }
  }
}
</script>

<style scoped>
</style>
