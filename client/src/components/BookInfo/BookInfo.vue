<template>
    <div class="row">
        <div class="col s12 l4 center">
            <router-link to="/">
                <Button
                    text="Back"
                    classes="btn-back"
                    color="blue"
                />
            </router-link>
            <img class="image-review" :src="thumbnail">
            <a
                :href="
                    title && authors ?
                    `https://www.amazon.com/s?k=${title.split(' ').join('+').toLowerCase()}+by+${authors.map(a => a.split(' ').join('+')).join('+').toLowerCase()}`
                    : 'https://www.amazon.com/s'
                "
                target="_blank"
            >
                <Button
                    text="Purchase"
                    classes="btn-buy"
                    color="green"
                />
            </a>
        </div>
        <div class="col s12 l8">
            <h4>{{ title }}</h4>
            <!-- Depends on how many authors there are -->
            <h6>{{ authors?.length > 1
                ? 'Authors'
                : 'Author'
            }}</h6>
            <!-- Sometimes there may be no author -->
            <p>{{ authors 
                ? authors.join(', ')
                : 'Anonymous'
            }}</p>
            <h6>Publish Date</h6>
            <p>{{ formatPublishDate() }}</p>
            <h6>Description</h6>
            <!-- Some descriptions have html tags in them -->
            <p>{{ description
                ? removeHtmlTags(description)
                : 'No description available.'
            }}</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import Button from '../Button/Button.vue'

export default {
    name: 'BookInfo',

    components: {
        Button
    },

    props: {
        id: String,
        title: String,
        authors: Array,
        thumbnail: String,
        description: String,
        published: String
    },

    methods: {
        removeHtmlTags(str) {
            // Replace HTML tags with an empty string
            return str.replace(/<[^>]*>/g, '');
        },

        formatPublishDate () {
            return moment(this.published).format('MMM Do YYYY')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './BookInfo.css';
</style>
