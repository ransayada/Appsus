export default {
    template: `
    <section class="note-filter">
        <div class="note-filter-input">
            <input @keyup.enter="filter" v-model="filterBy.txt" type="text" placeholder="Search...">    
        </div>
        <div class="note-filter-type">
            <select @change="filter" v-model="filterBy.type" type="text" placeholder="tag" id="types" name="types">
                <option value="all">All</option>
                <option value="note-txt">Texts</option>
                <option value="note-img">Images</option>
                <option value="note-todos">Todos</option>
                <option value="note-video">Video</option>
            </select>
            <span>Selected: {{filterBy.type}}</span>
        </div>
    </section>
    `,
    data() {
        return {
            filterBy: {
                type: 'all',
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