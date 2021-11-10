import { utilService } from "../services/util-service.js";
import { storageService } from "../services/async-storage-service.js";

const NOTES_KEY = 'notes_1';
_createNotes();

export const carService = {
    query,
    remove,
    save,
    getEmptyNote,
    getById,
    getNextNoteId
};

// var gNotes = [
//     { id: "n101",
//      type: "note-txt", 
//      isPinned: true, 
//      info: { txt: "Fullstack Me Baby!" } 
//     }, 
//     { id: "n102", 
//     type: "note-img", 
//     info: { url: "http://some-img/me", title: "Bobi and Me" }, 
//     style: { backgroundColor: "#00d" } 
//     }, 
//     { id: "n103", 
//     type: "note-todos", 
//     info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] } 
//     }
// ];

function _createNote(type = 'txt', isPinned = false, style = 'white', info) {
    const note = {
        id: utilService.makeId(),
        isPinned: isPinned,
        style: _addStyle(style),
        info: _addInfo(info, type)
    }
}

function _createNotes() {
    var notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || notes.length) {

    }
}