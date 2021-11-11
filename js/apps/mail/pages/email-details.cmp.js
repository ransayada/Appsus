import { emailService } from "./js/apps/mail/services/email.service.js";
import { eventBus } from "./js/services/event-bus-service.js";

export default {
    template: `
        <section v-if="email" class="email-details">
            <h3>{{email.subject}}</h3>
            <p>sender : {{email.from}}</p>
            <p>to : {{email.to}}</p>
            <article>
                <span> email body: </span> <br>
                {{email.body}} 
            </article>
            <span class="fa fa-envelope backToMail" @click="close"  ></span>
            <span class="fa fa-star star" :class="{checked: isStared}" @click="toggleStar()"></span>
            <span class="fa fa-trash removeMail"  @click="remove()"></span>
            <span class="fa fa-paper-plane sendMail"  ></span>
            <!-- <button @click="close" >X</button> -->
        </section>
        <section v-else class="loader">
            <h2>Loading...</h2>
        </section>
    `,
    data() {
        return {
            email: null,
            isStared: null
        };
    },
    created() {},
    methods: {
        close() {

            this.$router.push('/email');
        },
        toggleStar() {
            this.isStared = !this.isStared;
            eventBus.$emit('toggleStar', this.email.id);

        },
        remove() {
            eventBus.$emit('remove', this.email.id);
            this.$router.push('/email');
        }
    },
    watch: {
        '$route.params.emailId': {
            handler() {
                const { emailId } = this.$route.params;
                emailService.getById(emailId)
                    .then(email => {
                        this.email = email
                        this.isStared = email.isStared
                    });

            },
            immediate: true
        }
    }
};