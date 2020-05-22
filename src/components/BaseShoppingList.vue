<template>
  <v-app>
    <v-row no-gutters>
      <shoppeng-list-aside/>
      <shopping-list-content/>
    </v-row>
  </v-app>
</template>

<script>
import ShoppengListAside from './ShoppengListAside'
import ShoppingListContent from './ShoppingListContent'

export default {
  components: {
    ShoppengListAside,
    ShoppingListContent
  },
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
