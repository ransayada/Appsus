import { emailService } from "../services/email.service";
import { eventBus } from "../../../services/event-bus-service";
import emailList from "../cmps/email-list.cmp.js";
import emailFilter from "../cmps/email-filter.cmp.js";


export default {
    template: `
        <section class="email-app">
            <email-filter @filtered="setCreteria" />
            <email-list :emails="emailsToShow" @remove="removeEmail"/>
            
        </section>
    `,
    data() {
        return {
            emails: null,
            creteria: null
        };
    },
    created() {
       this.loadEmails();
    },
    methods: {
        loadEmails() {
            emailService.query()
                .then(emails => this.emails = emails);
        },
       
    },
    computed: {
    
    },
    components: {
        emailList,
        emailFilter,
    }
};
