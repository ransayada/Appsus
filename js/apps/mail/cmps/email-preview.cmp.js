export default {
    props: ['email'],
    template: `
        <div class="email-preview">
            <p>{{email.from}}</p>
            <p><span class="email-subject">{{email.subject}}</span>- <span class="email-desc">{{emailDescription}}</span></p>
            <p>{{emailSentAt}}</p>
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
            var emailDesc = this.email.body.substr(0, 50);
            return emailDesc + ((emailDesc.length < 50) ? '' : '...'); //not all message
        }
    }
}