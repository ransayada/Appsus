

export default {
  template: `
      <div class="email-filter">
              <div class="search-container">
                    <input class="filter-items" @input="filter" v-model="filterBy.txt" type="text" placeholder="Search Emails">
                    <select class="filter-items" id="emails" @change="selectShown">
                
                  <option value="all" >All</option>
                  <option value="read" >Read</option>
                  <option value="unread">Unread</option>
                </select>
            </div>
          
      </div>
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
      //deep copy
      // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
    },
    selectShown(event) {
      var selectOpt = event.target.value;
      if (selectOpt === 'all') this.filterBy.showAll = true;
      if (selectOpt === 'read') {
        this.filterBy.showAll = false;
        this.filterBy.isRead = true;
      }
      if (selectOpt === 'unread') {
        this.filterBy.showAll = false;
        this.filterBy.isRead = false;
      }
      this.filter();

    }

  }
}