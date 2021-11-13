import noteTextPreview from '/js/apps/keep/cmps/note-text-preview.cmp.js'
import noteImagePreview from '/js/apps/keep/cmps/note-image-preview.cmp.js'
import noteVideoPreview from '/js/apps/keep/cmps/note-video-preview.cmp.js'
import noteTodoPreview from '/js/apps/keep/cmps/note-todo-preview.cmp.js'

export default {
    props: ['note'],
    template: `
    <section class="note-preview">
        <div v-if="note.type==='note-txt'"> <note-text-preview class="note-txt" :txt="note.info.txt"/> <i class="type-img fas fa-text" v-if="note.type==='note-txt'"></i> </div>
        <div v-if="note.type==='note-img'"> <note-image-preview class="note-img" :url="note.info.url"  :title="note.info.title"/> <i class="type-img fas fa-images" v-if="note.type==='note-img'"></i> </div>
        <div v-if="note.type==='note-video'"> <note-video-preview class="note-video" :url="note.info.url"/> <i class="type-img fab fa-youtube" v-if="note.type==='note-video'"></i> </div>
        <div v-if="note.type==='note-todos'"> <note-todo-preview class="note-todo" :todos="note.info.todos" :txt="note.info.lable"/><i class="type-img fas fa-list-ul" v-if="note.type==='note-todos'"></i></div>
                <div class="add-actions">
                    <button @click="pin(note.id)" ><i class="fas fa-thumbtack"></i></button>
                    <button @click="markAsRead(note.id)" ><i class="fas fa-check"></i></button>
                    <button @mouseover="colorhover = true" @mouseleave="colorhover = false" ><i class="fas fa-palette"></i></button>
                    <table @mouseover="colorhover = true" @mouseleave="colorhover = false" v-if='colorhover'>
                        <tr >
                            <th @click="changeBC(note.id,'white')" style="color:white;"><i class="fas fa-circle"></i></th>
                            <th @click="changeBC(note.id,'blue')" style="color:blue;"><i class="fas fa-circle"></i></th>
                            <th @click="changeBC(note.id,'green')" style="color:green;"><i class="fas fa-circle"></i></th>
                            <th @click="changeBC(note.id,'yellow')" style="color:yellow;"><i class="fas fa-circle"></i></th>
                            <th @click="changeBC(note.id,'red')" style="color:red;"><i class="fas fa-circle"></i></th>
                            <th @click="changeBC(note.id,'purple')" style="color:purple;"><i class="fas fa-circle"></i></th>
                            <th @click="changeBC(note.id,'orange')" style="color:orange;"><i class="fas fa-circle"></i></th>
                        </tr>
                    </table>    
                    <button @click="edit(note.id,'blabla')" ><i class="fas fa-edit"></i></button>
                    <button @click="dup(note.id)" ><i class="far fa-clone"></i></button>
                    <button @click="remove(note.id)" ><i class="fas fa-trash"></i></button>
                </div>
    </section>
    `,
    data() {
        return {
            colorhover: false,
        }
    },
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
        noteTextPreview,
        noteImagePreview,
        noteVideoPreview,
        noteTodoPreview
    }
}