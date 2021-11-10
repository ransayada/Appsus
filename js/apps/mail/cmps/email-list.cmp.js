import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    template: `
    <section class="email-list">
        <h2>Emails</h2>
        <ul>
            <li v-for="email in emails" :key="email.id" class="email-preview-container" >
                <email-preview :email="email" @click.native="log" />
                <div class="actions">
                    <!-- <button @click="remove(email.id)" >X</button> -->
                    <button @click="addStar(email.id)" >⭐</button>
                    <!-- <router-link :to="'/email/'+email.id" >Details</router-link> -->
                </div>
            </li>
        </ul>
    </section>
    `,
    created(){
        console.log('list');
    },
    methods: {
        remove(emailId) {
            this.$emit('remove', emailId); //handle
        },
        addStar(emailId){
            this.$emit('toggleStar', emailId); 
        },
        log() {
            console.log('Logging.....');
        }
    },
    components:{
        emailPreview
    }
};