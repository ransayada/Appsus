import { utilService } from "/js/services/util-service.js";
import { storageService } from "/js/services/async-storage-service.js";

const NOTES_KEY = 'notes_5';
const PINNED = 'notes_pinned'
_createNotes();
_createPins();

export const noteService = {
    query,
    pinquery,
    remove,
    save,
    getEmptyNote,
    getById,
    addNewNote,
    pin,
    markAsRead,
    changeNoteColor,
    editNoteText,
    clone

};
var gPined = [];
var gNotes = [{
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" },
        label: "Fullstack Me Baby!"
    },
    {
        id: "n102",
        type: "note-img",
        info: { url: "http://some-img/me", title: "Bobi and Me" },
        style: { backgroundColor: "#00d" },
        lable: "Bobi and Me"
    },
    {
        id: "n103",
        type: "note-todos",
        info: { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] },
        label: "Get my stuff together"
    }
];

function query(filterBy = {}) {
    return storageService.query(NOTES_KEY)
        .then(notes => {
            return notes;
        });
}

function pinquery() {
    return storageService.query(PINNED)
        .then(pinned => {
            return pinned;
        })
}

function pin(noteId) {
    getById(noteId)
        .then(res => {
            if (!res.isPinned) {
                res.isPinned = true;
                return storageService.post(PINNED, res)
                    .then(remove(noteId))
            } else {
                res.isPinned = false;
                return storageService.remove(PINNED, noteId)
                    .then(save(res));
            }
        })

}


function markAsRead(noteId) {
    return getById(noteId)
        .then(res => {
            if (!res.isMarked) {
                res.isMarked = true;
                console.log(res);
            } else {
                res.isMarked = false;
                console.log(res);

            }
            return save(res);
        })
}

function changeNoteColor(noteId, color) {
    var colo = _addStyle(color);
    var note = getById(noteId);
    note.style = colo;
    save(note);
}

function editNoteText(noteId, text) {
    var note = getById(noteId);
    if (!note.type == 'note-txt') {
        return;
    } else {
        note.info.txt = text;
        save(note);
    }
}

function clone(noteId) {
    return getById(noteId)
        .then(res => {
            var newNote = _createNote(res.type, res.isPinned, res.isMarked, res.style, res.info, res.label);
            return storageService.post(NOTES_KEY, newNote);
        })

}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId);
}

function save(note) {
    if (note.id) return storageService.put(NOTES_KEY, note);
    else return storageService.post(NOTES_KEY, note);

}

function addNewNote(note) {
    return storageService.post(NOTES_KEY, note);

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
    return _createNote(type, false, false, 'white', op, 'label');
}

// function addNote(note) {
//     var notes = utilService.loadFromStorage(NOTES_KEY);
//     notes.push(note);
//     utilService.saveToStorage(NOTES_KEY, notes);
// }


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

function _createNote(type = 'txt', isPinned = false, isMarked = false, style = 'white', info, label = 'label') {
    const note = {
        id: utilService.makeId(),
        type: type,
        isPinned: isPinned,
        isMarked: isMarked,
        style: _addStyle(style),
        info: _addInfo(info, type),
        label: label
    }
    return note;
}

function _createNotes() {
    var notes = utilService.loadFromStorage(NOTES_KEY);
    if (!notes || notes.length) {
        notes = [];
        notes.push(_createNote('note-txt', false, false, 'white', { txt: "Fullstack Me Baby!" }, "Fullstack Me Baby!"));
        notes.push(_createNote('note-img', false, false, 'white', { url: "https://media.istockphoto.com/photos/funny-french-bulldog-with-outstretched-tongue-portrait-picture-id1131100866?s=612x612", title: "Bobi and Me" }, 'bobi and me'));
        notes.push(_createNote('note-video', false, false, 'white', { url: "https://www.youtube.com/embed/5qap5aO4i9A" }, 'youtube'));
        notes.push(_createNote('note-todos', false, false, 'white', { label: "Get my stuff together", todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }] }, "Get my stuff together"));
        notes.push(_createNote('note-txt', false, false, 'white', { txt: "Fullstack Me Baby!" }, "Fullstack Me Baby!"));
        notes.push(_createNote('note-txt', false, false, 'white', { txt: "Fullstack Me Baby!" }, "Fullstack Me Baby!"));
        utilService.saveToStorage(NOTES_KEY, notes);
    }
    return notes;
}

function _createPins() {
    var notes = utilService.loadFromStorage(NOTES_KEY);
    var pinned = [];
    notes.forEach(item => {
        if (item.isPinned) {
            pinned.push(item)
        }
    })
    utilService.saveToStorage(PINNED, pinned);
    return pinned;
}