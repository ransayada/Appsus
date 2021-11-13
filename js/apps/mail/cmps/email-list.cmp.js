import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-preview-container" :class="{ read: email.isRead }" @click="readEmail(email.id)" >
                <email-preview :email="email" />
                <div class="actions">
                    <span class="fa fa-star" :class="{checked: email.isStared}" title="save in starred" @click.stop="toggleStar(email.id)"></span>
                    <span class="fa fa-trash removeMail" title="delete this mail"  @click.stop="remove(email.id)"></span>
                    <span class="fa fa-paper-plane sendMail" title="send mail to notes"  ></span>
                    <span v-if="email.sentToTrash" title="remove from trash" class="fa fa-handshake-o restoreMail" @click.stop="removeFromTrash(email.id)"   ></span>
                </div>
            </li>
        </ul>
    </section>
    `,
    created() {
        console.log('list');
    },
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId); //handle
        },
        removeFromTrash(emailId) {
            this.$emit('removeFromTrash', emailId); //handle
        }
        ,
        toggleStar(emailId) {

            this.$emit('toggleStar', emailId);
        },
        readEmail(emailId) {

            this.$emit('readEmail', emailId);
            this.$router.push('/email/' + emailId);
        }
    },
    components: {
        emailPreview
    }
};