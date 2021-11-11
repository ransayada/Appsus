
export default {
    props: ['emptyEmail'],
    template: `
    <form @submit.prevent="send">
    <fieldset class="form">
        <div class="newMessage sendActions">
            <h3>New message </h3>  
            <section>
                <button class="fa fa-paper-plane sendMail sendMailCompose"></button>
                <span class="fa fa-times closeBtn" @click="close" ></span> 
            </section>
        </div>
        <input ref="to"  v-model="email.to" type="text" class="to-input" placeHolder="To:"/>
        <input   v-model="email.subject" type="text" class="subject-input" placeHolder="subject"/>
        <textarea v-model="email.body" class="form-control" id="emailBody" cols="30" rows="15"  placeHolder="message body"></textarea>
        <!-- <section class="sendActions">   
            <button class="fa fa-paper-plane sendMail"></button>
            <span class="fa fa-times closeBtn" @click="close" ></span>
        </section>    -->
    </fieldset>
    
    </form >
`,
    data() {
        return {
            email: null
        }
    },
    created() {
        this.email = this.emptyEmail
        console.log(this.email);
    },
    mounted() {
        this.focusInput();
    },
    methods: {

        send() {
            console.log('saved');
            this.email.sentAt =  Date.now();
            this.email.from = "user@appsus.com";
            this.$emit('sendMessage', this.email)
        },
        focusInput() {
            this.$refs.to.focus();
        },
        close(){
            this.$emit('closeSender')
        }

    }

}