import { emailService } from "/js/apps/mail/services/email.service.js";
import { eventBus } from "/js/services/event-bus-service.js";
import emailList from "../cmps/email-list.cmp.js";
import emailFilter from "../cmps/email-filter.cmp.js";


export default {
    template: `
        <section class="email-app">
        <email-filter  @filtered="setFilter" />
            <email-list :emails="emailsToShow" @remove="removeEmail" @toggleStar="toggleMailStar"/>             
        </section>
    `,
    data() {
        return {
            emails: null,
            user: null,
            creteria: null
        };
    },
    created() {
        console.log('hi');
        this.loadEmails();
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails);
            this.user = emailService.getLoggedInUser();
        },
        toggleMailStar(id){
            console.log('toggle Star');
            emailService.toggleStaredMail(id);
        }
        ,
        removeEmail(id) {
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
        },
        setFilter(creteria) {
            this.creteria = creteria;
        }
    },
    computed: {
        emailsToShow() {
            // console.log(this.emails);
            if (!this.creteria) return this.emails;
            const searchStr = this.creteria.txt.toLowerCase();
            var emailsToShow = this.emails;
            if (searchStr) {
                emailsToShow = this.emails.filter(email => {
                    return (email.subject.toLowerCase().includes(searchStr) ||
                        email.body.toLowerCase().includes(searchStr))
                });
            }
            console.log(this.creteria.isStared);
            if(this.creteria.isStared){
                emailsToShow = emailsToShow.filter( (email => email.isStared))
            }

            



            return emailsToShow;


        }

    },
    components: {
        emailList,
        emailFilter
    }
};
