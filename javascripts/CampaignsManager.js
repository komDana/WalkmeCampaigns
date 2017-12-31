let Campaign = require('./Campaign.js');

class CampaignsManager{
    constructor(campaignsRepository){
        this.campaignsRepository = campaignsRepository;
    }

    viewUserAvaliableCampaigns(user_id){
        var campaignsIterator = this.campaignsRepository.getCampaignsIterator();
        var userAvaliableCampaigns = [];        

        for (var campaign of campaignsIterator){            
            if(campaign.CanBeViewedByUser(user_id)){
                userAvaliableCampaigns.push(campaign);
                campaign.AddUserView(user_id);                
            }
        }
        
        this.campaignsRepository.updateCampaigns(userAvaliableCampaigns);

        return userAvaliableCampaigns;        
    }    
}

module.exports = CampaignsManager;