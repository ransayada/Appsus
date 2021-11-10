import noteTextPreview from '/js/apps/keep/cmps/note-text-preview.cmp.js'
import noteImagePreview from '/js/apps/keep/cmps/note-image-preview.cmp.js'
import noteVideoPreview from '/js/apps/keep/cmps/note-video-preview.cmp.js'
import noteTodoPreview from '/js/apps/keep/cmps/note-todo-preview.cmp.js'

export default {
    props: ['note'],
    template: `
    <section class="note-preview">
        <div v-if="note.type==='note-txt'"> <note-text-preview :info="note.info"/> text </div>
        <div v-if="note.type==='note-img'"> <note-image-preview :info="note.info"/> image </div>
        <div v-if="note.type==='note-video'"> <note-video-preview :info="note.info"/> video </div>
        <div v-if="note.type==='note-todos'"> <note-todo-preview :info="note.info"/> todo </div>
    </section>
    `,
    components: {
        noteTextPreview,
        noteImagePreview,
        noteVideoPreview,
        noteTodoPreview
    }
}