import { noteService } from './apps/keep/services/note.service.js';
import { eventBus } from '../services/event-bus-service.js';
import noteList from '../cmps/note-list.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteDetails from '../pages/note-details.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';

//note-app is root component
export default {
    template: `
    <section class="note-app flex flex-column align-center">
        <note-filter class="note-filter flex flex-column align-center" @filtered="setFilter" />
        <note-add  :types="['note-todos','note-txt','note-video','note-image']" @newNote="setNewNote"/>
        <note-pinned v-if="this.pinned!==null" class="pinned-list" :pinned="pinnedToShow"  @pin="pinNote" @read="readNote" @color="changeNoteColor" @edit="editNoteText" @clone="cloneNote" @remove="removeNote"/>
        <note-list class="note-list" :notes="notesToShow"  @pin="pinNote" @read="readNote" @color="changeNoteColor(ob)" @edit="editNoteText" @clone="cloneNote" @remove="removeNote"/>
    </section>
    `,
    data() {
        return {
            pinned: null,
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
        pinNote(id) {
            noteService.pin(id)
                .then(() => this.loadNotes());
        },
        readNote(id) {
            noteService.markAsRead(id)
                .then(() => this.loadNotes())
        },
        changeNoteColor(ob) {
            console.log('note changed color');
            noteService.changeNoteColor(ob)
                .then(() => this.loadNotes())

        },
        editNoteText(id, text) {
            console.log('note text edited', text);
            noteService.editNoteText(id, text)
                .then(() => this.loadNotes())
        },
        cloneNote(id) {
            console.log('note cloned');
            noteService.clone(id)
                .then(() => this.loadNotes())
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
        },
        setNewNote(newNote) {
            console.log(newNote)
            noteService.addNewNote(newNote)
                .then(res => {
                    this.loadNotes();
                })

        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const { type, txt } = this.filterBy;
            const search1 = txt.toLowerCase();
            const search2 = type;
            var notesToShow;
            if (search2 === 'all') {
                notesToShow = this.notes.filter(note => {
                    console.log(note.label.toLowerCase())
                    return note.label.toLowerCase().includes(search1)
                });
            } else {
                notesToShow = this.notes.filter(note => {
                    return note.label.toLowerCase().includes(search1) && (note.type === search2);
                });
            }

            return notesToShow;
        },
        pinnedToShow() {
            var pinnedToShow = this.notes.filter(note => { return note.isPinned === true; })
            return pinnedToShow;
        }

    },
    components: {
        noteFilter,
        noteDetails,
        noteList,
        noteAdd
    }
}
