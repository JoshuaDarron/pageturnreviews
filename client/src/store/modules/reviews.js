import axios from 'axios'

const url = 'http://localhost:8000/review'

const state = {
    reviews: []
}

const getters = {
    reviews: state => state.reviews
}

const actions = {
    async getReviews ({ commit }, { title, authors }) {
        const titleQuery = `title=${title.split(' ').join('%20')}`
        const authorQuery = `author=${authors.map(a => a.split(' ').join('%20')).join(',')}`
        const reviews = await axios.get(`${url}?${titleQuery}&${authorQuery}`)
        commit('setReviews', reviews.data)
    }
}

const mutations = {
    setReviews: (state, reviews) => (state.reviews = reviews)
}

export default {
    state,
    getters,
    actions,
    mutations
}
