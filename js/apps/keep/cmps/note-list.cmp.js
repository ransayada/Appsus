import notePreview from '/js/apps/keep/cmps/note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <ul class="note-list-ul flex wrap center ul-none" style="padding:5px;">
            <li style="border: 2px solid black;" v-for="note in notes" :key="note.id" class="note-preview-container flex flex-column space-between">
                <note-preview :note="note" @pin="pin" @read="read" @color="changeNoteColor" @edit="editNoteText" @clone="cloneNote" @remove="removeNote"/>
            </li>
        </ul>
    </section>
    `,
    methods: {
        pin(noteId) {
            this.$emit('pin', noteId)
        },
        markAsRead(noteId) {
            this.$emit('read', noteId)
        },
        changeBC(noteId) {
            this.$emit('color', noteId)
        },
        edit(noteId) {
            this.$emit('edit', noteId)
        },
        dup(noteId) {
            this.$emit('clone', noteId)
        },
        remove(noteId) {
            this.$emit('remove', noteId); //TODO: ask user if he is sure about it
        }
    },
    components: {
        notePreview
    }
}