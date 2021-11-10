export default {
  template: `
      <div class="email-filter">
          <label>
              <input @input="filter" v-model="filterBy.txt" type="text" placeholder="Search Emails">
          </label>
          <section class="folders">
            <div class="folder" @click="changeStatus('inbox')"> inbox </div>        
            <div class="folder" @click="changeStared()"> starred </div>        
            <div class="folder" @click="changeStatus('sent')"> sent Mail </div>        
            <div class="folder" @click="changeStatus('trash')"> garbage </div>        
            <div class="folder" @click="changeStatus('draft')"> Drafts </div>        
          </section>
      </div>
  `,
  data() {
      return {
          filterBy: {
              status:'inbox',
              txt: '',
              isRead:false,
              isStared:false,
              labels:[]
          }
      };
  },
  methods: {
      filter() {
          this.$emit('filtered', { ...this.filterBy });
          //deep copy
          // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
      },
      changeStatus(newStatus){
        this.filterBy.status = newStatus;
        console.log('changed status', this.filterBy.status);


      },
      changeStared(){
        this.filterBy.isStared = !this.filterBy.isStared
      }

  }
}