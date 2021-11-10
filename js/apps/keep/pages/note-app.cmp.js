import { noteService } from '/js/apps/keep/services/note.service.js';
import { eventBus } from '/js/services/event-bus-service.js';
import noteList from '../cmps/note-list.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteDetails from '../pages/note-details.cmp.js';


export default {
    template: `
    <section class="book-app">
        <book-filter />
        <book-list :books="booksToShow" />
    </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: null
        };
    },
    created() {
        this.loadNotes();
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => this.notes = notes);
        },
        removeNote(id) {
            noteService.remove(id)
                .then(() => {
                    const msg = {
                        txt: 'Deleted succesfully',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                    this.notes = this.notes.filter(note => note.id !== id)
                })
                .catch(err => {
                    console.log('err', err);
                    const msg = {
                        txt: 'Error. Please try later',
                        type: 'error'
                    };
                    eventBus.$emit('showMsg', msg);
                });
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const { type } = this.filterBy;
            const search = type.toLowerCase();
            const notesToShow = this.notes.filter(note => {
                return note.type.toLowerCase().includes(search);
            });
            return notesToShow
        },
        components: {
            noteFilter,
            noteDetails,
            noteList
        }
    }
}