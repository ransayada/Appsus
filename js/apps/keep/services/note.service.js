import { utilService } from "/js/services/util-service.js";
import { storageService } from "/js/services/async-storage-service.js";

const NOTES_KEY = 'notes_4';
_createNotes();

export const noteService = {
    query,
    remove,
    save,
    getEmptyNote,
    getById
    // getNextNoteId
};

var gNotes = [{
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" }
    },
    {
        id: "n102",
        type: "note-img",
        info: { url: "http://some-img/me", title: "Bobi and Me" },
        style: { backgroundColor: "#00d" }
    },
    {
        id: "n103",
        type: "note-todos",
        info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] }
    }
];

function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            return notes;
        });
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note);
    else return storageService.post(NOTES_KEY, note);

}

function getById(noteId) {
    return storageService.get(NOTES_KEY, noteId);
}

function getEmptyNote(type) {
    var op;
    switch (type) {
        case "note-txt":
            op = { txt: "" };
            break;
        case "note-img":
            op = { url: "", title: "" };
            break;
        case "note-todos":
            op = { label: "", todos: [] };
            break;
        case "note-video":
            op = { url: "" };
            break;
    }
    return _createNote(type, false, 'white', op);
}


// iner functions

//style colors table 0-white 1-blue 2-green 3-yellow 4-red 5-purple 6-orange 
function _addStyle(style) {
    // console.log('you are at _addStyle')
    var styleNum;
    switch (style) {
        case "white":
            styleNum = 0;
            break;
        case "blue":
            styleNum = 1;
            break;
        case "green":
            styleNum = 2;
            break;
        case "yellow":
            styleNum = 3;
            break;
        case "red":
            styleNum = 4;
            break;
        case "purple":
            styleNum = 5;
            break;
        case "orange":
            styleNum = 6;
            break;
    }
    return styleNum;
}

function _addInfo(info, type) {
    var op;
    switch (type) {
        case "note-txt":
            op = { txt: info.txt };
            break;
        case "note-img":
            op = { url: info.url, title: info.title };
            break;
        case "note-todos":
            op = { label: info.label, todos: info.todos };
            break;
        case "note-video":
            op = { url: info.url };
            break;
    }
    return op;
}

function _createNote(type = 'txt', isPinned = false, style = 'white', info) {
    const note = {
        id: utilService.makeId(),
        type: type,
        isPinned: isPinned,
        style: _addStyle(style),
        info: _addInfo(info, type)
    }
    console.log(note); //TODO: remove this is for debug
    return note;
}

function _createNotes() {
    var notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || notes.length) {
        notes = [];
        notes.push(_createNote('note-txt', false, 'white', { txt: "Fullstack Me Baby!" }));
        notes.push(_createNote('note-img', false, 'white', { url: "https://media.istockphoto.com/photos/funny-french-bulldog-with-outstretched-tongue-portrait-picture-id1131100866?s=612x612", title: "Bobi and Me" }));
        notes.push(_createNote('note-video', false, 'white', { url: "https://www.youtube.com/embed/5qap5aO4i9A" }));
        notes.push(_createNote('note-todos', false, 'white', { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] }));
        notes.push(_createNote('note-txt', false, 'white', { txt: "Fullstack Me Baby!" }));
        notes.push(_createNote('note-txt', false, 'white', { txt: "Fullstack Me Baby!" }));
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}