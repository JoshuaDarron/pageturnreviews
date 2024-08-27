<template>
    <div class="page">
        <!-- Search Form... Pretty self explanatory -->
        <SearchForm />
        <!-- Preloader for when searching for books -->
        <span v-if="!googleBooks.length">
            <Loader />
        </span>
        <!-- List of books -->
        <span v-else>
            <div class="row">
                <div v-for="book in googleBooks" :key="book.id" :ref="book.id">
                    <BookItem
                        :key="book.id"
                        :id="book.id"
                        :title="book.title"
                        :authors="book.authors"
                        :thumbnail="book.thumbnail"
                    />
                </div>
            </div>
            <div class="row center">
                <a class="waves-effect btn-flat" @click="addOffset">More</a>
            </div>
        </span>
        <!-- Contact Button -->
        <div class="fixed-action-btn">
            <a
                class="btn-floating btn-large blue waves-effect waves-light tooltipped"
                href="mailto: phillips@joshuadarron.com"
                data-position="top"
                data-tooltip="Contact"
            >
                <i class="large material-icons">contact_support</i>
            </a>
        </div>
    </div>
</template>

<script>
// Packages
import M from 'materialize-css'
// Components
import BookItem from '../../components/BookItem/BookItem.vue'
import Loader from '../../components/Loader/Loader.vue'
import SearchForm from '../../components/SearchForm/SearchForm.vue'
// Store initializers
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Search',

    components: {
        BookItem,
        Loader,
        SearchForm
    },

    mounted () {
        // CSS INITIALIZATION
        const tt = document.querySelectorAll('.tooltipped')
        M.Tooltip.init(tt, undefined, undefined)
    },

    methods: {
        ...mapActions(['googleBooksSearch']),
        ...mapMutations(['setGoogleOffset']),

        async addOffset () {     
            const add = 12
            this.setGoogleOffset(this.googleOffset + add)
            if (this.googleSearch.length) {
                await this.googleBooksSearch(this.googleSearch)
            } else {
                await this.googleBooksSearch()
            }
        }
    },

    computed: mapGetters(['googleBooks', 'googleSearch', 'googleOffset', 'googleSearchDefault'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './Search.css';
</style>
