import { noteService } from '/js/apps/keep/services/note.service.js';
import { eventBus } from '/js/services/event-bus-service.js';
import noteList from '../cmps/note-list.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteDetails from '../pages/note-details.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';

//note-app is root component
export default {
    template: `
    <section class="note-app flex flex-column align-center">
        <note-filter class="note-filter flex flex-column align-center" @filtered="setFilter" />
        <note-add  :types="['note-todos','note-txt','note-video','note-image']"/>
        <note-list class="note-list" :notes="notesToShow" @remove="removeNote"/>
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
            const { type, txt } = this.filterBy;
            const search1 = txt.toLowerCase();
            const search2 = type.toLowerCase();
            const notesToShow = this.notes.filter(note => {
                return note.txt.toLowerCase().includes(search1) && note.type.toLowerCase().includes(search2);
            });
            return notesToShow;
        }
    },
    components: {
        noteFilter,
        noteDetails,
        noteList,
        noteAdd
    }
}