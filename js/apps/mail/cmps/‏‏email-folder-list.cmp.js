export default {
    template: `
      <section class="email-folder-list">
            <div class="folder" :class="{chosenFolder: this.currentFolder === 'inbox'}" @click="changeStatus('inbox')"> inbox </div>        
            <div class="folder" :class="{chosenFolder: this.filterBy.isStared}" @click="changeStared()"> starred </div>        
            <div class="folder" :class="{chosenFolder: this.currentFolder === 'sent'}" @click="changeStatus('sent')"> sent Mail </div>        
            <div class="folder" :class="{chosenFolder: this.currentFolder === 'trash'}" @click="changeStatus('trash')"> garbage </div>        
            <div class="folder" :class="{chosenFolder: this.currentFolder === 'draft'}" @click="changeStatus('draft')"> Drafts </div>        
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
            },
            currentFolder: null
        };
    },
    methods: {
        filter() {
            this.$emit('filtered', { ...this.filterBy });
        },
        changeStatus(newStatus) {
            this.currentFolder = newStatus;
            this.filterBy.status = newStatus;
            this.filterBy.isStared = false;
            this.filter();
        },
        changeStared() {
            this.filterBy.isStared = true;
            this.currentFolder = null;
            this.filter();

        }
    }
}
