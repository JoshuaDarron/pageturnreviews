<template>
    <div>
        <div class="navbar-fixed">
			<nav>
				<div class="nav-wrapper grey">
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
                        <li>
                            <div class="divider"></div>
                        </li>
                        <li class="bottom"><a href = "mailto: phillips@joshuadarron.com"><i class="material-icons">contact_support</i>Contact</a></li>
                    </ul>
                </div>
                <div class="col s12 m8 l9 xl10">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import M from 'materialize-css'
import { mapActions, mapMutations, mapGetters } from 'vuex'

const categories = [
    "Art",
    "Award Winners",
    "Best Sellers",
    "Biography",
    "Business",
    "Classics",
    "Cookbooks",
    "Family",
    "Fantasy",
    "Fitness",
    "Health",
    "History",
    "Mystery",
    "New Releases",
    "Philosophy",
    "Religion",
    "Science",
    "Science Fiction",
    "Self-Help",
    "Sports",
    "Technology",
    "Travel"
]

export default {
    name: 'SideNav',

    data () {
        return {
            categories,
            selected: [],
        }
    },

    components: {},

    async mounted () {
        // This mounts at the top level, and doesn't remount as
        // often as Search. So we load the defaults here, and
        // handle search within that page.
        await this.googleBooksSearch()
        // Css initialization
        const sideNavsLinks = document.querySelectorAll('.sidenav-links')
        M.Sidenav.init(sideNavsLinks, undefined, undefined)
    },

    methods: {
        ...mapActions(['googleBooksSearch']),
        ...mapMutations(['setGoogleBooks']),
        
        async handleCheckboxChange(event) {
            this.$root.$emit('reset-search')
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
                query = this.googleSearchDefault
            }

            await this.googleBooksSearch(query)
        }
    },

    computed: mapGetters('googleSearchDefault')
}
</script>


<style scoped>
@import './SideNav.css';
</style>
