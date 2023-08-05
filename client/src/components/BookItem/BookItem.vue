<template>
    <span class="col s12 m6 l4 xl3 center book">
        <div class="image-container">
            <img class="image-item" :src="thumbnail">
        </div>
        <div class="info-container">
            <p class="book-title">{{ title }}</p>
            <p class="book-author">{{ authors ? authors.join(', ') : 'Anonymous' }}</p>
        </div>
        <div class="btn-container">
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
                    classes="btn-action"
                    color="green"
                />
            </a>
            <router-link :to="'/reviews?id=' + id">
                <Button
                    text="Reviews"
                    classes="btn-action"
                    color="purple"
                />
            </router-link>
        </div>
    </span>
</template>

<script>
import Button from '../Button/Button.vue'

export default {
    name: 'BookItem',

    props: {
        id: String,
        title: String,
        authors: Array,
        thumbnail: String
    },

    components: {
        Button
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './BookItem.css';
</style>
