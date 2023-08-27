<template>
    <div class="row">
        <form action="submit" @submit.prevent="handleSearch">
            <div class="col s12 m12 l9">
                <input
                    class="validate"
                    id="search"
                    type="text"
                    v-model="search"
                    required
                    placeholder="Search for a title, author, or subject"
                />
            </div>
            <div class="col s12 m12 l3">
                <Button
                    text="Search"
                    classes="btn-search"
                    color="blue"
                    type="submit"
                />
            </div>
        </form>
    </div>
</template>

<script>
import Button from '../Button/Button.vue'

import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
    name: 'SearchForm',

    components: {
        Button
    },

    data() {
        return {
            search: ''
        }
    },

    mounted () {
        this.search = this.googleSearch
        this.$root.$on('reset-search', this.resetSearch)
    },

    methods: {
        ...mapActions(['googleBooksSearch']),
        ...mapMutations(['setGoogleBooks', 'setGoogleSearch']),

        resetSearch () {
            this.search = ''
            this.setGoogleSearch(this.search)
        },

        async handleSearch () {
            this.setGoogleBooks([])
            this.setGoogleSearch(this.search)
            await this.googleBooksSearch(this.search)
        }
    },

    computed: mapGetters(['googleSearch'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './SearchForm.css';
</style>
