var tap = require('tap')
var Campaign = require('../javascripts/Campaign');
var Thresholds = require('../javascripts/Thresholds.js');
// max_total = 2, max_per_user = 1
var thresholdsWithUnlimitedMaxTotal = new Thresholds(2, 1);
var user_id1 = 1;
var user_id2 = 2;
var user_id3 = 3;

// After one user viewed campaign, campaign views equals to 1
// After user viewed campaign once, user view counter equals to 1
var campaign = new Campaign(1, "campaign1", thresholdsWithUnlimitedMaxTotal);

campaign.AddUserView(user_id1);

tap.equal(campaign.views, 1);
tap.equal(campaign.usersViewsCounter.get(user_id1), 1);

// After user viewed campaign once, user can't view campaign again.
campaign = new Campaign(1, "campaign1", thresholdsWithUnlimitedMaxTotal);
campaign.AddUserView(user_id1);

var canBeViewedByUser = campaign.CanBeViewedByUser(user_id1);

tap.equal(canBeViewedByUser, false);

// After first user viewed campain once ,second user can view campaign again
campaign = new Campaign(1, "campaign1", thresholdsWithUnlimitedMaxTotal);
campaign.AddUserView(user_id1);

canBeViewedByUser = campaign.CanBeViewedByUser(user_id2);
tap.equal(canBeViewedByUser, true);

// After two users viewed the campain, third user can't view campaign again
campaign = new Campaign(1, "campaign1", thresholdsWithUnlimitedMaxTotal);
campaign.AddUserView(user_id1);
campaign.AddUserView(user_id2);

canBeViewedByUser = campaign.CanBeViewedByUser(user_id3);
tap.equal(canBeViewedByUser, false);

// A user can view campaign once, but there is no limit to max_total views
// max_total = unlimited, max_per_user = 1
var thresholdsWithUnlimitedMaxTotal = new Thresholds(undefined , 1);
campaign = new Campaign(1, "campaign1", thresholdsWithUnlimitedMaxTotal);

campaign.AddUserView(user_id1);
campaign.AddUserView(user_id2);

canBeViewedByUser = campaign.CanBeViewedByUser(user_id3);
tap.equal(canBeViewedByUser, true);

// max_per_user is unlimited, but there is limit on max_total views
// max_per_user = unlimited, max_total = 2
var thresholdsWithUnlimitedMaxPerUser = new Thresholds(2, undefined);
campaign = new Campaign(1, "campaign1", thresholdsWithUnlimitedMaxPerUser);

campaign.AddUserView(user_id1);
campaign.AddUserView(user_id1);

canBeViewedByUser = campaign.CanBeViewedByUser(user_id2);
tap.equal(canBeViewedByUser, false);