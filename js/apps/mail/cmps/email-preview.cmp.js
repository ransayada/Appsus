export default {
    props: ['email'],
    template: `
        <div class="email-preview">
            <p class="email-prev-item">{{email.from}}</p>
            <p class="email-prev-item"><span class="email-subject">{{email.subject}}</span>- <span class="email-desc">{{emailDescription}}</span></p>
            <p class="email-prev-item">{{emailSentAt}}</p>
        </div>
    `,
    created() {

    },
    computed: {
        emailSentAt() {
            const sentAt = new Date(this.email.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return sentAt;
        },
        emailDescription() {
            var emailDesc = this.email.body.substr(0, 30);
            return emailDesc + ((emailDesc.length < 30) ? '' : '...'); //not all message
        }
    }
}