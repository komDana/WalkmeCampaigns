"use strict";
var express  = require('express');
var bodyParser = require('body-parser');
let Campaign = require('./javascripts/Campaign.js');
let Thresholds = require('./javascripts/Thresholds.js');
let CampaignDataApi = require('./javascripts/CampaignDataApi'); 
let CampaignsManager = require('./javascripts/CampaignsManager.js');
let CampaignsRepository = require('./javascripts/CampaignsRepository.js');

var app = express();
var port = process.env.PORT || 8080;
var campaignRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', campaignRouter);

var campaignsRepository = new CampaignsRepository("../jsons/campaings.json");
var campaignsManager = new CampaignsManager(campaignsRepository);

campaignRouter.route('/campaigns')
.get(function(req, res){                        
    var userAvaliableCampaigns = campaignsManager.viewUserAvaliableCampaigns(req.query.user_id);
    var campaignsApiPerUser =  convertToCampaignApi(userAvaliableCampaigns);
    res.json(campaignsApiPerUser);
});

function convertToCampaignApi(campaigns){
    var campaignsApi = [];
    for(var index = 0; index < campaigns.length; index++){
        var campaign = campaigns[index];
        var campaignApi = new CampaignDataApi(campaign.id, campaign.name, campaign.thresholds, campaign.data);
        campaignsApi.push(campaignApi);
    }
    return campaignsApi;
}

app.listen(port);
console.log('Magic happens on port ' + port);
