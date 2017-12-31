class CampaignDataApi {
    
    constructor(id, name, thresholds, data) {
      this.id = id;
      this.name = name;
      this.thresholds = thresholds;
      this.data =  data;      
    }
}
module.exports = CampaignDataApi;