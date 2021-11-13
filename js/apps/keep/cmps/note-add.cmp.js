import { noteService } from '../services/note.service.js'

export default {
    props: ['types'],
    template: `
    <section class="add-note flex">
            <div class="add-note-div flex align-center space-between border-radius" style="border-style: solid; border-color: black;">
            <input v-model="userInput" type="text" class="add-input" :placeholder="placeHolderString" @keyup.enter="addNote(userInput)"/>
            <div class="btn-container">
                    <a  style="color:grey;" class="btn btn-add-note txt-note-btn" @click.prevent="updateType('txt')"><i class="fas fa-text"></i></a>
                    <a style="color:grey;" class="btn btn-add-note img-note-btn" @click.prevent="updateType('img')"><i class="fas fa-images"></i></a>
                    <a style="color:grey;" class="btn btn-add-note todo-note-btn" @click.prevent="updateType('todo')"><i class="fas fa-list-ul"></i></a>
                    <a style="color:grey;" class="btn btn-add-note video-note-btn" @click.prevent="updateType('video')"><i class="fab fa-youtube"></i></a>
            </div>
</div>
    </section> 
    `,
    data() {
        return {
            newNote: noteService.getEmptyNote('note-txt'),
            type: 'note-txt',
            userInput: '',
            placeHolderString: "Add a new note"
        }
    },

    methods: {
        updateType(type) {
            if (type === 'txt') {
                this.placeHolderString = 'Enter text to keep';
                this.newNote = noteService.getEmptyNote('note-txt');
                this.type = 'note-txt';
            } else if (type === 'img') {
                this.placeHolderString = 'Enter image url to keep';
                this.newNote = noteService.getEmptyNote('note-img');
                this.type = 'note-img';
            } else if (type === 'video') {
                this.placeHolderString = 'Enter video url to keep';
                this.newNote = noteService.getEmptyNote('note-video');
                this.type = 'note-video';
            } else if (type === 'todo') {
                this.placeHolderString = 'Enter todos to keep';
                this.newNote = noteService.getEmptyNote('note-todos');
                this.type = 'note-todos';
            }
        },
        addNote(uip) {
            console.log(uip);
            if (this.type === 'note-todos') {
                var todoss = [];
                var tds = uip.split(',');
                for (let i = 0; i < tds.length; i++) {
                    todoss.push({ txt: tds[i], doneAt: null })
                }
                this.newNote.info.todos = todoss;
            } else if (this.type === 'note-txt') {
                this.newNote.info.txt = uip;
            } else if (this.type === 'note-img') {
                this.newNote.info.url = this.userInput;
            } else if (this.type === 'note-video') {
                this.newNote.info.url = this.userInput;
            }
            this.$emit('newNote', this.newNote);
            this.placeHolderString = "Add a new note";
            this.newNote = noteService.getEmptyNote('note-txt');
            this.type = 'note-txt';
            this.userInput = '';
        }
    }
}