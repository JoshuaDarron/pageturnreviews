<template>
    <div class="page">
        <!-- Search Form... Pretty self explanatory -->
        <SearchForm />
        <!-- Preloader for when searching for books -->
        <span v-if="!googleBooks.length">
            <Loader />
        </span>
        <!-- List of books -->
        <span v-else class="row">
            <div v-for="book in googleBooks" :key="book.id" :ref="book.id">
                <BookItem
                    :id="book.id"
                    :title="book.title"
                    :authors="book.authors"
                    :thumbnail="book.thumbnail"
                />
            </div>
        </span>
        <!-- <div class="row center">
            <a href="#">Load More</a>
        </div> -->
    </div>
</template>

<script>
// Components
import BookItem from '../../components/BookItem/BookItem.vue'
import Loader from '../../components/Loader/Loader.vue'
import SearchForm from '../../components/SearchForm/SearchForm.vue'
// Store initializers
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Search',

    components: {
        BookItem,
        Loader,
        SearchForm
    },

    data() {
        return {
            default: 'Best Sellers'
        }
    },

    async mounted () {
        if (!this.googleBooks.length) {
            await this.googleBooksSearch(this.default)
        }
    },

    methods: {
        ...mapActions(['googleBooksSearch'])
    },

    computed: mapGetters(['googleBooks'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './Search.css';
</style>
