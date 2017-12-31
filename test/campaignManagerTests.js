var tap = require('tap');

let CampaignsManager = require('../javascripts/CampaignsManager.js');
let CampaignsRepository = require('../javascripts/CampaignsRepository.js');

var user_id1 = 1;
var campaignsRepository = new CampaignsRepository("../jsons/campaignsForTest.json");
var campaignsManager = new CampaignsManager(campaignsRepository);

// After User viewed campaigns once (two campaigns one with max_per_user - 1, second with max_per_user = 3),
// User can view only the second campaign
var expectedCampaigns = {"id": 102, "name": "Rate this app", "thresholds": {"max_per_user": 3}, "data": {}};

var userAvaliableCampaigns = campaignsManager.viewUserAvaliableCampaigns(user_id1);
userAvaliableCampaigns = campaignsManager.viewUserAvaliableCampaigns(user_id1);

tap.equal(userAvaliableCampaigns.length, 1)
CompareCampaigns(expectedCampaigns, userAvaliableCampaigns[0]);
 
function CompareCampaigns(expectedCampaign, actualCampaign){
    tap.equal(actualCampaign.id, expectedCampaign.id);
    tap.equal(actualCampaign.name, expectedCampaign.name);
    tap.equal(actualCampaign.data.length, expectedCampaign.data.length);
    CompareThreasholds(expectedCampaign.thresholds, actualCampaign.thresholds);
}

function CompareThreasholds(expectedThreashold, actualThreashold){
    tap.equal(actualThreashold.max_per_user, expectedThreashold.max_per_user);
    tap.equal(actualThreashold.max_total, expectedThreashold.max_total);
}