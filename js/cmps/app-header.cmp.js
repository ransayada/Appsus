export default {
    template: `
        <header class="app-header">
            <h3>Appsus<span class="dot">.</span></h3>
            <nav>
                <router-link to="/" active-class="active-link" exact>Home</router-link> |
                <router-link to="/book">Books</router-link> |
                <router-link to="/keep">keep</router-link> |
                <router-link to="/email">mail</router-link> |
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
}