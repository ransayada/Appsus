import notePreview from '/js/apps/keep/cmps/note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <ul class="note-list-ul flex wrap center ul-none" style="padding:5px;">
            <li style="border: 2px solid black;" v-for="note in notes" :key="note.id" class="note-preview-container">
                <note-preview :note="note"/>
                <img class="type-img" v-if="note.type==='text'" src='./img/text-type.png'/>
                <img class="type-img" v-if="note.type==='img'" src='./img/img-type.png'/>
                <img class="type-img" v-if="note.type==='videos'" src='./img/video-type.png'/>
                <img class="type-img" v-if="note.type==='todo'" src='./img/todo-type.png'/>
                <div class="add-actions">
                    <button @click="remove(note.id)" >X</button>
                </div>
            </li>
        </ul>
    </section>
    `,
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId); //TODO: ask user if he is sure about it
        }
    },
    components: {
        notePreview
    }
}