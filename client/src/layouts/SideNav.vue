<template>
    <div>
        <div class="navbar-fixed">
			<nav>
				<div class="nav-wrapper grey darken-1">
                    <a
                        href="#"
                        data-target="dashboard-slide-out"
                        class="sidenav-trigger nav-button">
                        <i class="large material-icons">
                            menu
                        </i>
                    </a>
				</div>
			</nav>
		</div>
        <div class="container">
            <div class="row">
                <div class="col s12 m2 l3 xl2">
                    <ul id="dashboard-slide-out" class="sidenav sidenav-fixed sidenav-links">
                        <router-link to="/">
                            <li>
                                <img src="../assets/logo.png" />
                            </li>
                        </router-link>
                        <li>
                            <div class="divider"></div>
                        </li>
                        <li><a class="subheader">Genres</a></li>
                        <li v-for="genre in genres" :key="genre" class="genre-checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    :value="genre.toLowerCase()"
                                    @change="handleCheckboxChange($event)"
                                />
                                <span>{{ genre }}</span>
                            </label>
                        </li>
                        <li><a class="subheader">Categories</a></li>
                        <li v-for="category in categories" :key="category" class="genre-checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    :value="category.toLowerCase()"
                                    @change="handleCheckboxChange($event)"
                                />
                                <span>{{ category }}</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="col s12 m8 l9 xl10">
                    <!-- TODO: This is used to rerender reviews from the Related book items.
                        This is really specific, and should be handled within the Reviews.vue file -->
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css'
import { mapActions, mapMutations } from 'vuex'

const genres = [
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Thriller",
    "Science Fiction",
    "Fantasy",
    "Romance",
    "Historical Fiction",
    "Biography",
    "Autobiography",
    "Self-help",
    "Business",
    "Young Adult",
    "Children's",
    "Horror",
    "Poetry",
    "Memoir",
    "Travel",
    "Science",
    "Philosophy"
]

const categories = [
    "Best Sellers",
    "New Releases",
    "Classics",
    "Award Winners",
    "Popular Science",
    "Self-Help and Personal Development",
    "Biography and Memoir",
    "History",
    "Mystery and Thriller",
    "Science Fiction and Fantasy",
    "Art and Photography",
    "Business and Finance",
    "Health and Wellness",
    "Travel and Adventure",
    "Cookbooks and Food",
    "Philosophy and Religion",
    "Sports and Fitness",
    "Parenting and Family",
    "Technology and Computing"
]

export default {
    name: 'SideNav',

    data () {
        return {
            categories,
            default: 'Best Sellers',
            genres,
            selected: [],
        }
    },

    components: {},

    mounted () {
        // CSS INITIALIZATION
        const sideNavsLinks = document.querySelectorAll('.sidenav-links')
        M.Sidenav.init(sideNavsLinks, undefined, undefined)
    },

    methods: {
        ...mapActions(['googleBooksSearch']),
        ...mapMutations(['setGoogleBooks']),
        
        async handleCheckboxChange(event) {
            this.setGoogleBooks([])

            if (this.$route.name !== 'Search') {
                this.$router.push({ path: '/' })
            }

            const value = event.target.value
            const checked = event.target.checked

            if (checked) {
                this.selected.push(value)
            } else {
                this.selected = this.selected.filter(function (s) {
                    return s !== value
                })
            }

            let query = ''
            if (this.selected.length) {
                query = this.selected.join(', ')
            } else {
                query = 'best sellers'
            }

            await this.googleBooksSearch(query)
        }
    }
}
</script>


<style scoped>
@import './SideNav.css';
</style>



<!-- Genres:
1. Fiction
2. Non-fiction
3. Mystery
4. Thriller
5. Science Fiction
6. Fantasy
7. Romance
8. Historical Fiction
9. Biography
10. Autobiography
11. Self-help
12. Business
13. Young Adult
14. Children's
15. Horror
16. Poetry
17. Memoir
18. Travel
19. Science
20. Philosophy

Categories:
1. Bestsellers
2. New Releases
3. Classics
4. Award Winners
5. Popular Science
6. Self-Help and Personal Development
7. Biography and Memoir
8. History
9. Fiction
10. Non-fiction
11. Mystery and Thriller
12. Science Fiction and Fantasy
13. Romance
14. Young Adult
15. Children's Books
16. Art and Photography
17. Business and Finance
18. Health and Wellness
19. Travel and Adventure
20. Cookbooks and Food
21. Philosophy and Religion
22. Sports and Fitness
23. Parenting and Family
24. Technology and Computing
25. Poetry -->
