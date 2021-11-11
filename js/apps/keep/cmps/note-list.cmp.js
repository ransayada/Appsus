import notePreview from '/js/apps/keep/cmps/note-preview.cmp.js'

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <ul class="note-list-ul flex wrap center ul-none" style="padding:5px;">
            <li style="border: 2px solid black;" v-for="note in notes" :key="note.id" class="note-preview-container flex flex-column space-between">
                <note-preview :note="note"/>
                <i class="type-img fas fa-text" v-if="note.type==='note-txt'"></i>
                <i class="type-img fas fa-images" v-if="note.type==='note-img'"></i>
                <i class="type-img fab fa-youtube" v-if="note.type==='note-video'"></i>
                <i class="type-img fas fa-list-ul" v-if="note.type==='note-todos'"></i>
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
            </li>
        </ul>
    </section>
    `,
    data() {
        return {
            colorhover: false
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
        notePreview
    }
}