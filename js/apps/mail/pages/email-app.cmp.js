<<<<<<< HEAD
import { emailService } from "../services/email.service.js";
import { eventBus } from "../../../services/event-bus-service.js";
import emailList from "../cmps/email-list.cmp.js";
import emailFilter from "../cmps/email-filter.cmp.js";
import emailFolderList from "../cmps/‏‏email-folder-list.cmp.js";
import emailCompose from "../cmps/email-compose.cmp.js"
=======
import { emailService } from "./apps/mail/services/email.service.js";
import { eventBus } from "../services/event-bus-service.js";
import emailList from "../cmps/email-list.cmp.js";
import emailFilter from "../cmps/email-filter.cmp.js";
import emailFolderList from "./apps/mail/cmps/‏‏email-folder-list.cmp.js";
import emailCompose from "./apps/mail/cmps/email-compose.cmp.js"
>>>>>>> 4f3f4aa883a046e7cedbb8dd957453bcbc6dc9a1


export default {
    template: `
        <section class="email-app">
        <email-filter  @filtered="setFilter" />
        <section class="mail-layout">  
        <section class="mail-options">  
            <div class="fa fa-plus compose"  @click="openCompose"> Compose </div>
            <email-folder-list  @filtered="setFilterFolder" />
        </section>
            <email-compose v-if="this.user.isSendingEmail" :emptyEmail="emptyEmail" @sendMessage="sendMessage"  @closeSender="closeSender"/>
            <img v-if="!this.creteria" src="/img/welcome.gif">
            <email-list  :emails="emailsToShow" @remove="removeEmail" @removeFromTrash="removeFromTrash" @toggleStar="toggleMailStar" @readEmail="readEmail"/>             
            </section>
        </section>
    `,
    data() {
        return {
            emails: null,
            user: emailService.getLoggedInUser(),
            creteria: null,
            emptyEmail: null
        };
    },
    created() {
        this.loadEmails();
        eventBus.$on('toggleStar', this.toggleMailStar);
        eventBus.$on('remove', this.removeEmail);
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails);

        },
        openCompose() {
            console.log('hi');
            this.getEmptyEmail();
            this.user.isSendingEmail = true;
        },
        getEmptyEmail() {
            this.emptyEmail = emailService.getEmptyEmail()

        },
        closeSender() {
            this.user.isSendingEmail = false;
        },
        sendMessage(email) {
            this.user.isSendingEmail = false; //close sender
            // console.log(email);
            emailService.save(email)
                .then(() => {
                    const msg = {
                        txt: 'message sent',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);    
                    this.loadEmails()
                })


        },
        toggleMailStar(id) {
            emailService.toggleStaredMail(id)
                .then(() => {
                    // const msg = {
                    //     txt: 'added to stared',
                    //     type: 'success'
                    // };
                    // eventBus.$emit('showMsg', msg);    
                    this.loadEmails()
                })
        },
        readEmail(id) {
            emailService.readMail(id)
                .then(() => this.loadEmails())
        },
        removeFromTrash(id) {
            emailService.toggleEmailTrash(id)
                .then(() => {
                    const msg = {
                        txt: 'removed from trash',
                        type: 'success'
                    };
                    eventBus.$emit('showMsg', msg);
                
                    this.loadEmails()
                })
        },
        removeEmail(id) {
            emailService.getById(id)
                .then(email => {

                    if (!email.sentToTrash) {
                        emailService.toggleEmailTrash(id)
                            .then(() => {
                                const msg = {
                                    txt: 'sent to trash',
                                    type: 'success'
                                };
                                eventBus.$emit('showMsg', msg);
                                this.loadEmails()
                            })
                    } else {
                        emailService.remove(id)
                            .then(() => {
                                const msg = {
                                    txt: 'Deleted succesfully',
                                    type: 'success'
                                };
                                eventBus.$emit('showMsg', msg);
                                this.emails = this.emails.filter(email => email.id !== id)
                            })
                            .catch(err => {
                                console.log('err', err);
                                const msg = {
                                    txt: 'Error. Please try later',
                                    type: 'error'
                                };
                                eventBus.$emit('showMsg', msg);
                            });
                    }


                })

        },
        setFilter(creteria) {
            if (this.creteria) {

                creteria.status = this.creteria.status
                creteria.isStared = this.creteria.isStared

            }

            this.creteria = creteria;

            this.loadEmails()
        },
        setFilterFolder(creteria) {
            this.creteria = creteria;
            this.loadEmails()
        }
    },
    computed: {
        emailsToShow() {
            // console.log(this.emails);
            if (!this.creteria) return;
            var emailsToShow = this.emails;
            // console.log('here you ' + this.creteria.status);

            if (this.creteria.isStared) {
                // console.log('at stars ' + this.creteria.isStared);
                emailsToShow = emailsToShow.filter((email => {
                    // console.log('email stared ' + email.isStared);
                    return email.isStared && (!email.sentToTrash)
                }))
            } else if (this.creteria.status === 'inbox') {
                // console.log(this.creteria.status);
                emailsToShow = emailsToShow.filter((email => {
                    return (email.to === this.user.email) && (!email.sentToTrash)
                }))
            } else if (this.creteria.status === 'sent') {
                // console.log(this.creteria.status);
                emailsToShow = emailsToShow.filter((email => {
                    return (email.to !== this.user.email || email.from === this.user.email) && (!email.sentToTrash)
                }))
            } else if (this.creteria.status === 'trash') {
                // console.log(this.creteria.status);
                emailsToShow = emailsToShow.filter((email => {
                    return email.sentToTrash
                }))
            }


            const searchStr = this.creteria.txt.toLowerCase();
            if (searchStr) {
                // console.log(searchStr);
                emailsToShow = emailsToShow.filter(email => {
                    // console.log(email);
                    return (email.subject.toLowerCase().includes(searchStr) ||
                        email.body.toLowerCase().includes(searchStr))
                });
            }



            if (!this.creteria.showAll) {
                emailsToShow = emailsToShow.filter((email => {

                    return (email.isRead === this.creteria.isRead) && (!email.sentToTrash)
                }))
            }
            return emailsToShow;


        }

    },
    components: {
        emailList,
        emailFilter,
        emailFolderList,
        emailCompose
    }
};
