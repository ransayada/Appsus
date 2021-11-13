export default {
    template: `
    <section class="note-filter">
        <div class="filter-box flex space-between align-center border-radius" style="margin: 10px; border-style: solid; border-color: black;">
        <div class="note-filter-input">
            <input class="filter-input" @keyup.enter="filter" v-model="filterBy.txt" type="text" placeholder="Search...">    
        </div>
        <div class="note-filter-type">
            <select class="filter-input" @change="filter" v-model="filterBy.type" type="text" placeholder="tag" id="types" name="types">
                <option value="all">All</option>
                <option value="note-txt">Texts</option>
                <option value="note-img">Images</option>
                <option value="note-todos">Todos</option>
                <option value="note-video">Video</option>
            </select>
        </div>
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