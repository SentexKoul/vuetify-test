<template>
  <div class="custom-data">
    <div class="custom-data-buttons text-left">
      <b-button @click="showApiForm = !showApiForm">api</b-button>
      <b-button @click="showJsonForm = !showJsonForm">json</b-button>
    </div>
    <div class="custom-data-inputs">
      <b-input-group v-if="showApiForm">
        <b-form-input
          v-model="apiUrl"
          @click.stop 
          type="text" 
          placeholder="Адрес api"
        />

        <b-input-group-append>
          <b-button @click="getDataFromApi">
            <b-icon-check/>
          </b-button>
        </b-input-group-append>
      </b-input-group>

      <div v-if="showJsonForm">
        <b-form-file
          v-model="file"
          :state="Boolean(file)"
          @change="readFile"
          class="text-left"
          placeholder="Выберите файл..."
          accept=".json"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'ListCustomData',

  data() {
    return {
      showApiForm: false,
      showJsonForm: false,
      apiUrl: null,
      file: null
    }
  },

  computed: {
    ...mapState('data', ['lists', 'selectedListIndex'])
  },

  methods: {
    getDataFromApi() {
      if (!this.apiUrl.length) return

      this.axios.get(this.apiUrl)
        .then(response => {
          this.saveJson(response.data)
        })
        .catch(error => {
          console.log(error);
        })
    },

    readFile(event) {
      let reader = new FileReader()
      reader.onload = this.saveJson

      reader.readAsText(event.target.files[0])
    },

    saveJson(data) {
      let result = JSON.parse(data.target ? data.target.result : data)
      this.$store.commit('data/setLists', result)
    }
  }
}
</script>

<style lang="scss">
  .dropdown {
    margin: 10px 0;
  }

  .custom-data {
    padding-top: 15px;

    &-buttons {
      margin-bottom: 15px;

      button {
        &:first-child {
          margin-right: 5px;
        }
      }
    }
    &-inputs {
      .input-group-append {
        margin-bottom: 10px;
      }
    }
  }
</style>