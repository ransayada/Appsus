export default {
    template: `
    <section class="note-filter">
        <div class="note-filter-input">
            <input @input="filter" v-model="filterBy.txt" type="text" placeholder="Search...">    
        </div>
        <div class="note-filter-type">
            <select v-model="filterBy.type" id="types" name="types">
                <option value="text">Texts</option>
                <option value="img">Images</option>
                <option value="todo">Todos</option>
                <option value="video">Video</option>
            </select>
            <span>Selected: {{type}}</span>
        </div>
    </section>
    `,
    data() {
        return {
            filterBy: {
                txt: '',
                type: ''
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy });
        }
    }
}