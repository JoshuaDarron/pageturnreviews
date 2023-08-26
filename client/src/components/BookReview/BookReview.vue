<template>
    <span>
        <div v-for="review in reviews" :key="review.type">
            <!-- Review Button Row -->
            <div class="row">
                <div v-for="reviewer in reviewers" :key="reviewer.type" class="col s6 m6 l3 btn-review">
                    <Button
                        :text="reviewer.name"
                        color="grey"
                        classes="disabled"
                    />
                </div>
            </div>
            <!-- Review Row -->
            <div class="row">
                <div class="col m12">
                    <h6>Rating</h6>
                    <star-rating
                        v-model="review.rating"
                        v-bind:increment="0.1"
                        active-color="#212121"
                        star-size="25"
                        read-only="true" />
                    <p>
                        {{review.reason}}
                    </p>

                    <h6>Review</h6>
                    <p>
                        {{review.review}}
                    </p>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import StarRating from 'vue-star-rating'
import Button from '../Button/Button.vue'

const reviewers = [{
    name: 'Chat GPT',
    type: 'open-ai',
    selected: true
}
// {
//     name: 'Amazon',
//     type: 'amazon',
//     selected: false
// }, {
//     name: 'Google',
//     type: 'alphabet',
//     selected: false
// }
]

export default {
    name: 'BookReview',

    components: {
        Button,
        StarRating
    },

    props: {
        reviews: Array
    },

    data() {
        return {
            reviewers
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import './BookReview.css';
</style>
