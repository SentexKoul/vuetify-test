<template>
  <div class="table-wrapper">
    <div class="table-delete text-right">
      <b-button v-if="getSelectedList" @click="deleteList">
        <span>Удалить список</span>
        <b-icon-trash/>
      </b-button>
    </div>

    <table v-if="productsList.length" class="table">
      <tbody>
        <tr 
          v-for="(product, index) in productsList"
          @click="selectProduct(index)"
          @keyup.enter="saveProductData(product, index)"
          :class="{
            'bought': product.bought, 
            'active': selectedProductIndex == index
          }"
          :key="index"
        >
          <td class="text-left" >
            <p v-show="editedProductIndex != index">{{ product.name }}</p>
            <b-form-input
              v-if="editedProductIndex == index"
              v-model="editedProductData.name" 
              type="text"
            />
            <b-button>
              <b-icon-check 
                v-if="editedProductIndex == index"
                @click.stop="saveProductData(product, index)"
              />
              <b-icon-pencil 
                v-else
                @click.stop="editProductData(product, index)"
              />
            </b-button>
          </td>

          <td class="text-center" >
            <p>{{ product.count }}</p>
            <b-form-input
              v-if="editedProductIndex == index"
              v-model="editedProductData.count" 
              type="number"
            />
            <b-button v-else @click="toggleProductStatus(product)">
              <b-icon-arrow-clockwise v-if="product.bought"/>
              <b-icon-check v-else/>
            </b-button>
          </td>

          <td class="text-center" >
            <p>{{ product.unit }}</p>
            <b-form-select
              v-if="editedProductIndex == index"
              v-model="editedProductData.unit" 
              :options="units"
            />
            <b-button v-else @click="deleteProduct(product)">
              <b-icon-trash/>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else class="table-empty">{{ emptyTableInfo }}</p>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ListTable',

  props: {
    search: String
  },

  data() {
    return {
      selectedProductIndex: null,
      editedProductIndex: null,
      editedProductData: null
    }
  },

  computed: {
    ...mapGetters('data', ['getSelectedList']),
    ...mapState('data', ['units']),

    productsList() {
      if (this.getSelectedList) {
        let products = this.getSelectedList.products

        let filteredProducts = products.filter(product => {
          const name = product.name.toLowerCase()
          return name.includes(this.search ? this.search.toLowerCase() : '')
        })

        return filteredProducts
      } else {
        return []
      }
    },

    emptyTableInfo() {
      let info

      if (!this.getSelectedList) {
        info = 'Выберите список'
      } else if (this.getSelectedList.products.length) {
        info = 'Нет совпадений'
      } else {
        info = 'В списке пока нет товаров'
      }

      return info
    }
  },

  methods: {
    selectProduct(index) {
      if (this.editedProductIndex == index) return

      this.selectedProductIndex = (this.selectedProductIndex == index) ? null : index
      this.editedProductIndex = null
    },

    toggleProductStatus(product) {
      this.$store.commit('data/toggleProductBoughtStatus', product.name)
    },

    editProductData(product, index) {
      this.editedProductIndex = index
      this.editedProductData = product
    },

    saveProductData(product, index) {
      this.$store.commit('data/editProduct', {data: product, index: index})
      this.selectedProductIndex = null
      this.editedProductIndex   = null
      this.editedProductData    = null
    },

    deleteProduct(product) {
      this.$store.commit('data/deleteProduct', product.name)
    },

    deleteList() {
      this.$store.commit('data/deleteList')
    },
  }
}
</script>

<style lang="scss">
  .table {
    &-empty {
      margin: 40px 0 60px;
    }
    &-delete {
      background-color: #c4c4c4;
      padding: 0 10px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      span {
        margin-right: 5px;
      }
    }

    tr {
      position: relative;
      cursor: pointer;
      max-height: 38px;

      &:not(.active) {
        td {
          button {
            display: none;
          }
        }
      }
      &.active {
        td {
          &:first-child {
            position: relative;
            button {
              position: absolute;
              top: 12px;
              left: -22px;
              padding: 6px 0;
            }
          }

          &:not(:first-child) {
            p {
              display: none;
            }
          }

          button {
            display: inline-block;
          }
        }
      }
      &.bought {
        p {
          opacity: .3;
        }
      }

      td {
        border: none;
        
        &:first-child {
          width: 70%;
          user-select: none;
        }
        &:not(:first-child) {
          width: 15%;
        }

        p {
          display: inline-block;
          margin: 8px 0;
        }
      }

      .product-actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        height: 48px;
      }
    }
  }
</style>