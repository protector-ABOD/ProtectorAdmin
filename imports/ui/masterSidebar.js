import { Template } from 'meteor/templating';
 
import './masterSidebar.html';
 
Template.masterSidebar.helpers({
});

Template.masterSidebar.onRendered(function() {
	$(".sidebar-toggle").bind("click", function (e) {
		$("#sidebar").toggleClass("active");
		$(".app-container").toggleClass("__sidebar");
	});
});

Template.masterSidebar.events({
	'click #nav-to-agent-request-listing'(event) {
		event.preventDefault();
		
		//change page to site maintenace
		Session.set('page', 'AgentListing');
	},
	'click #nav-to-edit-agent-profile'(event) {
		event.preventDefault();
		
		//change page to site maintenace
		Session.set('page', 'EditAgentProfile');
	}
});