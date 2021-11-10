export default {
    template: `
    <section class="note-filter">
        <div class="note-filter-input">
            <input @input="filter" v-model="filterBy.txt" type="text" placeholder="Search...">    
        </div>
        <div class="note-filter-type">
            <select @change="filter" v-model="filterBy.type" type="text" placeholder="tag" id="types" name="types">
                <option value="text">Texts</option>
                <option value="img">Images</option>
                <option value="todo">Todos</option>
                <option value="video">Video</option>
            </select>
            <span>Selected: {{filterBy.type}}</span>
        </div>
    </section>
    `,
    data() {
        return {
            filterBy: {
                type: '',
                txt: ''
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filtered', {...this.filterBy });
        }
    }
}