import { utilService } from "/js/services/util-service.js";
import { storageService } from "/js/services/async-storage-service.js";

const EMAILS_KEY = 'emails';
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Omar Amer'
}

_createEmails();

export const emailService = {
    query,
    remove,
    save,
    getEmptyEmail,
    getById,
    getLoggedInUser,
    toggleStaredMail
};



function getLoggedInUser() {
    return loggedinUser;
}

function query(creteria = {}) {
    return storageService.query(EMAILS_KEY)
        .then(emails => {
            // if (filterBy.topCars) { check creteria to filter

            // }
            return emails;
        });
}

function remove(emailId) {

    return storageService.remove(EMAILS_KEY, emailId);
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function save(email) {
    if (email.id) return storageService.put(EMAILS_KEY, email);
    else return storageService.post(EMAILS_KEY, email);
}

function toggleStaredMail(emailId) {
    storageService.get(EMAILS_KEY, emailId)
        .then(email => {
            console.log(email);
            email.isStared = !email.isStared
            storageService.put(EMAILS_KEY, email);
        })
   
    
}


function getEmptyEmail() {
    return {
        id: '',
        subject: '',
        body: '',
        isRead: false,
        isStared: false,
        sentAt: '',
        to: ''
    };
}

function _createEmail(subject = 'test subject', body = 'hi email', from = 'coding-academy@gmail.com', to = 'user@appsus.com', isRead = false, isStared = false) {
    const email = {
        id: utilService.makeId(),
        subject,
        body,
        isRead,
        isStared,
        sentAt: Date.now(),
        from,
        to

    }
    return email;
}

function _createEmails() {
    var emails = utilService.loadFromStorage(EMAILS_KEY);
    if (!emails || emails.length) {
        emails = []
        emails.push(_createEmail())
        emails.push(_createEmail('hi second', 'aaaaa', 'sender@gmail.com', 'o@gmail.com'))
        emails.push(_createEmail('hi third', 'taaaaaa', 'yaron@gmail.com', 'hiB@gmail.com'))
        utilService.saveToStorage(EMAILS_KEY, emails);
    }
}