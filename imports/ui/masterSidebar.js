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
	'click #nav-to-maintenance-site'(event) {
		event.preventDefault();
		
		//change page to site maintenace
		Session.set('page', 'AgentListing');
	},
});