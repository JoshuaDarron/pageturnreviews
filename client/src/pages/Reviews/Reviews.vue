<template>
    <div class="page" :key="bookId">
        <span v-if="!googleBook">
            <Loader />
        </span>

        <span v-else>
            <BookInfo
                :id="googleBook.id"
                :title="googleBook.title"
                :authors="googleBook.authors"
                :thumbnail="googleBook.thumbnail"
                :description="googleBook.description"
                :published="googleBook.publishedDate"
            />

            <h5>Reviews</h5>
            <span v-if="!reviews.length">
                <div class="progress blue lighten-4 reviews-loader">
                    <div class="indeterminate blue"></div>
                </div>
            </span>
            <span v-else>
                <BookReview :reviews="reviews"  />
            </span>

            <div class="row">
                <h5 class="col m12">Related</h5>
                <div v-for="book in filteredBooks" :key="book.id" :ref="book.id">
                    <BookItem
                        :id="book.id"
                        :title="book.title"
                        :authors="book.authors"
                        :thumbnail="book.thumbnail"
                    />
                </div>
            </div>

        </span>
    </div>
</template>

<script>
import BookInfo from '../../components/BookInfo/BookInfo.vue'
import BookItem from '../../components/BookItem/BookItem.vue'
import BookReview from '../../components/BookReview/BookReview.vue'
import Loader from '../../components/Loader/Loader.vue'

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Review',

    components: {
        BookInfo,
        BookItem,
        BookReview,
        Loader
    },

    data() {
        return {
            bookId: '',
            filteredBooks: []
        }
    },

    async mounted () {
        this.bookId = this.$route.query.id
        if (!this.bookId) {
            await this.$router.push('/')
        } else {
            await this.setup()
        }
        
    },

    methods: {
        ...mapActions(['googleBookLookup', 'googleRelatedBooksSearch', 'getReviews']),
        ...mapMutations(['setGoogleBook', 'setReviews']),

        resetPage () {
            this.setGoogleBook(null)
            this.setReviews([])
            this.filteredBooks = []
        },

        async handleRelatedBooks () {
            // Setup related books query
            const query = this.googleBook.title + ' by ' + this.googleBook.authors.join(', ')
            await this.googleRelatedBooksSearch(query)
            // Filter out books with the same title
            const title = this.googleBook.title
            const filtered = this.relatedGoogleBooks.filter(function (b) {
                return b.title !== title
            })
            // Push filtered books into a list and limit to 4 items only
            this.filteredBooks = []
            for (let i = 0; i < 4; i++) {
                this.filteredBooks.push(filtered[i])
            }
        },

        async handleReviews () {
            await this.getReviews({
                title: this.googleBook.title,
                authors: this.googleBook.authors
            })
        },

        async setup () {
            // Reset all initial values
            this.resetPage()
            // Lookup the book by it's id
            await this.googleBookLookup(this.bookId)
            // Get the related books
            await this.handleRelatedBooks()
            // Get reviews for book
            await this.handleReviews()
        }
    },

    watch: {
        '$route.query.id': {
            handler: async function (id) {
                this.bookId = id
                await this.setup()
            },
            deep: true
        }
    },

    computed: mapGetters(['googleBook', 'relatedGoogleBooks', 'reviews'])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './Reviews.css';
</style>
