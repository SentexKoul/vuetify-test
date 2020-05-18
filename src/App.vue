<template>
  <div id="app">
    <shopping-list/>
  </div>
</template>

<script>
import ShoppingList from './components/ShoppingList'

export default {
  name: 'App',

  components: {
    ShoppingList
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
