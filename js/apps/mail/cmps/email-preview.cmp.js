export default {
    props: ['email'],
    template: `
        <div class="email-preview">
            <p>{{email.from}}</p>
            <p>{{email.subject}}-{{emailDescription}}</p>
            <p>{{emailSentAt}}</p>
        </div>
    `,
    compued: {
        emailSentAt() {
            const sentAt = new Date(this.email.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return sentAt;
        },
        emailDescription() {
            return this.email.body.substr(0, 50) + '...'; //not all message
        }
    }
}