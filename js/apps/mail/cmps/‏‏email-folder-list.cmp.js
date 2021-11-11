

export default {
    template: `
      <section class="email-folder-list">
            <div class="folder" @click="changeStatus('inbox')"> inbox </div>        
            <div class="folder" @click="changeStared()"> starred </div>        
            <div class="folder" @click="changeStatus('sent')"> sent Mail </div>        
            <div class="folder" @click="changeStatus('trash')"> garbage </div>        
            <div class="folder" @click="changeStatus('draft')"> Drafts </div>        
    </section>
    `,
    data() {
        return {
            filterBy: {
                status: 'inbox',
                txt: '',
                showAll: true,
                isRead: false,
                isStared: false,
                labels: []
            }
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        },
        changeStatus(newStatus) {
            this.filterBy.status = newStatus;
            this.filterBy.isStared = false;
            this.filter();
        },
        changeStared() {
            this.filterBy.isStared = true;
            this.filter();

        }
    }
}