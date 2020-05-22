<template>
    <v-tabs 
        background-color="transparent"
        class="lists"
        :vertical="true" 
        :grow="true"
        dark
    >
        <v-tab 
            v-for="(list, i) in lists"
            @click="selectList(i)"
            class="justify-start mx-10" 
            :key="i"
        >
            <v-icon left>{{ list.icon }}</v-icon>
            {{ list.name }}
        </v-tab>
    </v-tabs>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('data', ['lists'])
    },

    methods: {
        selectList(index) {
            this.$store.commit('data/setSelectedList', index)
        }
    }
}
</script>