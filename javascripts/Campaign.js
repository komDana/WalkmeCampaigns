class Campaign {    
    constructor(id, name, thresholds, data) {
      this.id = id;
      this.name = name;
      this.thresholds = thresholds;
      this.data = data;
      this.usersViewsCounter = new Map();
      this.views = 0;
    }

    AddUserView(user_id){
      if(this.usersViewsCounter.has(user_id)){
        var userAmountViews = this.usersViewsCounter.get(user_id) + 1;
        this.usersViewsCounter.set(user_id, userAmountViews);
      }
      else{
        this.usersViewsCounter.set(user_id, 1);
      }

      this.views++;
    }

    CanBeViewedByUser(user_id){
      if (typeof this.thresholds.max_total !== "undefined" 
          && this.views >= this.thresholds.max_total){
        return false;
      }

      if(typeof this.thresholds.max_per_user !== "undefined"
         &&this.usersViewsCounter.has(user_id) 
         && this.usersViewsCounter.get(user_id) >= this.thresholds.max_per_user){
            return false;
      }
      
      return true;
    }
  }
  module.exports = Campaign;