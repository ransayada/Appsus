export default {
    props: ['todos', 'txt'],
    template: `
    <section >
       
        <h1>{{txt}}</h1>
        <ul>
            <li v-for="item in todos" :key="item.id">
                <p>{{item.txt}}</p>
                <p>{{item.doneAt}}</p>
            </li>
            <li class="checked">Pay bills</li>
        </ul>
    </section>
 `

}