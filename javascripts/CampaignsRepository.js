let Campaign = require('./Campaign.js');
let Thresholds = require('./Thresholds.js');
let Data = require('./Data.js');

class CampaignsRepository{
    constructor (jsonPath){
        var campaignsFromJsonRepository = require(jsonPath).campaigns;        
        this.campaignsMapper = new Map();
        this.initiateCampaignsMapper(campaignsFromJsonRepository);
    }   
    
    initiateCampaignsMapper(campaignsFromJsonRepository){        
        for (var index = 0; index < campaignsFromJsonRepository.length; index++){        
            var compaignFromRepository = campaignsFromJsonRepository[index];
            var data = new Data();
            var thresholds = new Thresholds(compaignFromRepository.thresholds.max_total, compaignFromRepository.thresholds.max_per_user);
            var campaign = new Campaign(compaignFromRepository.id, compaignFromRepository.name, thresholds, data)
            this.campaignsMapper.set(campaign.id, campaign);
        }
    }
    
    getCampaignsIterator(){
        var campaigns = this.campaignsMapper.values();
        return campaigns;
    }

    updateCampaigns(campaigns){
        for (var index = 0; index < campaigns.length; index++){
            var campaign = campaigns[index];
            this.campaignsMapper.set(campaign.id, campaign);
        }      
    }
}

module.exports = CampaignsRepository