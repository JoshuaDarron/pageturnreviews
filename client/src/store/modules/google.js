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
    relatedGoogleBooks: [],
    googleSearch: 'Best Sellers',
    googleOffset: 0
}

const getters = {
    googleBook: state => state.googleBook,
    googleBooks: state => state.googleBooks,
    relatedGoogleBooks: state => state.relatedGoogleBooks,
    googleSearch: state => state.googleSearch,
    googleOffset: state => state.googleOffset
}

const actions = {
    async googleBooksSearch ({ commit, getters }, query) {
        const books = await asyncGoogleSearch(query, {
            limit: 12,
            offset: getters.googleOffset
        })
        const old = getters.googleBooks
        // Make sure there are no duplicate
        const filtered = books.filter(function(b) {
            const some = old.some(function (o) {
                return o.id === b.id
            })
            if (!some) return b
        })
        const updated = [...old, ...filtered]
        commit('setGoogleBooks', updated)
    },

    async googleRelatedBooksSearch ({ commit }, query) {
        const books = await asyncGoogleSearch(query)
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
    setRelatedGoogleBooks: (state, relatedGoogleBooks) => (state.relatedGoogleBooks = relatedGoogleBooks),
    setGoogleSearch: (state, googleSearch) => (state.googleSearch = googleSearch),
    setGoogleOffset: (state, googleOffset) => (state.googleOffset = googleOffset)
}

export default {
    state,
    getters,
    actions,
    mutations
}
