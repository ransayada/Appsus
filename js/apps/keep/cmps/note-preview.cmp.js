import noteTextPreview from '/js/apps/keep/cmps/note-text-preview.cmp.js'
import noteImagePreview from '/js/apps/keep/cmps/note-image-preview.cmp.js'
import noteVideoPreview from '/js/apps/keep/cmps/note-video-preview.cmp.js'
import noteTodoPreview from '/js/apps/keep/cmps/note-todo-preview.cmp.js'

export default {
    props: ['note'],
    template: `
    <section class="note-preview">
        <div v-if="note.type==='note-txt'"> <note-text-preview class="note-txt" :txt="note.info.txt"/> text </div>
        <div v-if="note.type==='note-img'"> <note-image-preview class="note-img" :url="note.info.url"  :title="note.info.title"/> image </div>
        <div v-if="note.type==='note-video'"> <note-video-preview class="note-video" :url="note.info.url"/> video </div>
        <div v-if="note.type==='note-todos'"> <note-todo-preview class="note-todo" :todos="note.info.todos" :txt="note.info.lable"/> todo </div>
    </section>
    `,
    components: {
        noteTextPreview,
        noteImagePreview,
        noteVideoPreview,
        noteTodoPreview
    }
}