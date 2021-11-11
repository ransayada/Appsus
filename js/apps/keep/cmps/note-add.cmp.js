import { noteService } from '/js/apps/keep/services/note.service.js'
import { eventBus } from '/js/services/event-bus-service.js'

export default {
    props: ['types'],
    template: `
    <!-- <section class="add-note"> -->
        <h1> note add / not finish  TODO: finish addNote component :)</h1>
        <!-- <form class="add-note-container">
            <input v-model="userInput" :placeholder="placeHolderString" @keyup.enter="addNote"/>
            <div>
                <template v-for="(type,idx) in tyeps">
                    <i :class="setSelectedType(idx,type)" @click="updateType(idx)"></i>
                </template>
            </div>
        </form>

    </section> -->
    `,
    // data() {
    //     return {
    //         newNote: noteService.getEmptyNote(),
    //         userInput: ''
    //     }
    // }
}