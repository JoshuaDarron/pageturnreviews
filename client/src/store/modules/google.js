const google = require('google-books-search')

function asyncGoogleSearch (query, options) {
    return new Promise(function(resolve, reject) {
        google.search(query, options, function (err, res) {
            if (err) reject(err)
            else resolve(res)
        })
    })
}

function asyncGoogleLookup (id) {
    return new Promise(function(resolve, reject) {
        google.lookup(id, function(err, res) {
            if (err) reject(err)
            else resolve(res)
        })
    })
}


const state = {
    googleBook: {},
    googleBooks: [],
    relatedGoogleBooks: []
}

const getters = {
    googleBook: state => state.googleBook,
    googleBooks: state => state.googleBooks,
    relatedGoogleBooks: state => state.relatedGoogleBooks
}

const actions = {
    async googleBooksSearch ({ commit }, query) {
        const books = await asyncGoogleSearch(query, { limit: 18 })
        commit('setGoogleBooks', books)
    },

    async googleRelatedBooksSearch ({ commit }, query) {
        const books = await asyncGoogleSearch(query, { limit: 18 })
        commit('setRelatedGoogleBooks', books)
    },

    async googleBookLookup ({ commit }, id) {
        const book = await asyncGoogleLookup(id)
        commit('setGoogleBook', book)
    }
}

const mutations = {
    setGoogleBook: (state, googleBook) => (state.googleBook = googleBook),
    setGoogleBooks: (state, googleBooks) => (state.googleBooks = googleBooks),
    setRelatedGoogleBooks: (state, relatedGoogleBooks) => (state.relatedGoogleBooks = relatedGoogleBooks)
}

export default {
    state,
    getters,
    actions,
    mutations
}
