<template>
  <div id="app">
    <base-shopping-list/>
  </div>
</template>

<script>
import BaseShoppingList from './components/BaseShoppingList'

export default {
  name: 'App',

  components: {
    BaseShoppingList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
