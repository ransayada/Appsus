export default {
    props: ['todos', 'txt'],
    template: `
    <section class="flex center">
        <h1>{{txt}}</h1>
        <ul>
            <li v-for="item in todos" :key="item.id">
                <p>{{item.txt}}</p>
                <!-- <p>{{item.doneAt}}</p> -->
            </li>
        </ul>
    </section>
 `

}