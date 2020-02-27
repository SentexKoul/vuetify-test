<template>
  <b-nav vertical class="text-left">
    <b-nav-item
      v-for="(list, index) in lists"
      @click="selectList(index)"
      :active="index == selectedListIndex"
      :key="index"
    >
      <b-form-input
        v-if="index == selectedListIndex && 
              index == renamedListIndex"
        v-model="newListName"
        @keyup.enter="saveListName"
        @click.stop
        type="text"
      />
      <p v-else>{{ list.name }}</p>

      <b-icon-pencil 
        v-if="index == selectedListIndex &&
              index != renamedListIndex" 
        @click.stop="editListName(list, index)"
      />
      <b-icon-check
        v-if="index == selectedListIndex && 
              index == renamedListIndex" 
        @click="saveListName"
      />
    </b-nav-item>
  </b-nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ListNavigation',

  data() {
    return {
      newListName: null,
      renamedListIndex: null
    }
  },

  computed: {
    ...mapState('data', ['lists', 'selectedListIndex'])
  },

  methods: {
    resetMutableValues() {
      this.renamedListIndex = null
      this.newListName = null
    },

    selectList(index) {
      this.$store.commit('data/setSelectedList', index)
      this.resetMutableValues()
    },

    editListName(list, index) {
      this.newListName = list.name
      this.renamedListIndex = index
    },

    saveListName() {
      this.$store.commit('data/editList', this.newListName)
      this.resetMutableValues()
    }
  }
}
</script>

<style lang="scss">
  .nav {
    &-item {
      border: 1px solid #6c757d;

      &:not(:last-child) {
        border-bottom: none;
      }
    }

    &-link {
      display: flex !important;
      align-items: center;
      justify-content: space-between;
      color: #6c757d;
      height: 42px;

      &:hover {
        color: #000;
      }

      &.active {
        position: relative;
        color: #000;
        background-color: #c4c4c4;

        &:after {
          content: '';
          position: absolute;
          top: 12px;
          right: -12px;
          display: block;
          width: 22px;
          height: 14px;
          background-color: #c4c4c4;
          border-top: 1px solid #6c757d;
          border-right: 1px solid #6c757d;
          transform: rotate(70deg) skew(50deg);
        }
      }

      p {
        margin: 0;
      }
    }
  }
</style>
