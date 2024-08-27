// PAGES
import Reviews from '../pages/Reviews/Reviews'
import Search from '../pages/Search/Search'

export default [
    // Public
    {
        path: '/',
        name: 'Search',
        component: Search
    },
    {
        path: '/reviews',
        name: 'Reviews',
        component: Reviews
    },
    // Catch all else
    {
        path: '/*',
        name: 'Catch',
        component: Search
    }
]