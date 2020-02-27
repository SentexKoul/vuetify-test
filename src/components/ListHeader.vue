<template>
  <b-row>
    <b-col class="text-left">
      <b-button
        @click="toggleAddingForm"
        variant="outline-secondary"
      >
        Доб. список
      </b-button>

      <div class="add-list" v-if="showAddingForm">
        <div class="add-list-controls">
          <b-input-group>
            <b-form-input
              @keyup.enter="addNewList"
              v-model="newListName" 
              placeholder="Введите название списка"
            />

            <b-input-group-append>
              <b-button @click="addNewList">+</b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
    </b-col>

    <b-col class="searchbar text-center">
      <b-input-group size="sm" class="mb-2">
        <b-input-group-prepend is-text>
          <b-icon icon="search"></b-icon>
        </b-input-group-prepend>
        <b-form-input v-model="search" placeholder="найти..." />
      </b-input-group>
    </b-col>

    <b-col class="text-right">
      <b-button 
        @click="sortList" 
        variant="outline-secondary"
      >
        По имени
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'ListHeader',

  data() {
    return {
      search: null,
      newListName: null,
      showAddingForm: false
    }
  },

  methods: {
    toggleAddingForm() {
      this.showAddingForm = !this.showAddingForm
    },

    addNewList() {
      const list = {
        name: this.newListName,
        products: []
      }

      this.$store.commit('data/addNewList', list)

      this.showAddingForm = false
      this.newListName = null
    },

    sortList() {
      this.$store.commit('data/sortSelectedList')
    }
  },

  watch: {
    search(value) {
      this.$emit('search', value)
    }
  }
}
</script>

<style lang="scss">
  .row {
    margin-bottom: 50px;
  }

  .add-list {
    position: relative;

    &-controls {
      width: 100%;
      position: absolute;
      left: 0;
      top: calc(100% + 5px);
    }
  }
</style>
