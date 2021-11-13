export default {
    template: `
        <header class="app-header">
            <h3 class="fa fa-bullseye logo">Appsus<span class="dot">.</span></h3>
            <nav>
                <router-link to="/" class="fa fa-home link" active-class="active-link" exact> Home</router-link> |
                <router-link to="/book" class="fa fa-book link" > Books</router-link> |
                <router-link to="/keep" class="fa fa-sticky-note link"> keep</router-link> |
                <router-link to="/email" class="fa fa-envelope link"> mail</router-link> |
                <router-link to="/about" class="fa fa-address-book link"> About</router-link>
            </nav>
        </header>
    `,
}