import { Template } from 'meteor/templating';
 import { AgentRequestList } from '../api/AgentRequest.js';

import './floatingActionButton.html';
 
Template.floatingActionButton.helpers({
});

Template.floatingActionButton.onRendered(function() {
	$(document).click(function (event) {
	  if (!$(event.target).closest('.btn-floating').length) {
		if ($('.btn-floating .toggle-content').is(":visible")) {
		  $('.btn-floating').toggleClass("active");
		}
	  }
	});
	$('[data-toggle="toggle"]').bind("click", function () {
		var elm = $(this);
		var target = elm.attr("data-target");
		var targetElm = $(target);

		targetElm.toggleClass("active");
	});
	$('.AddAgent').bind("click", function(){
		// console.log(Meteor.userId());
		var AgentName = prompt("Agent Name:", "");
		Meteor.call('AgentRequest.Insert', {
			AgentName: AgentName,
			UserID: Meteor.userId()
		});
	});
	$('.ResetAgent').bind("click", function(){
		Meteor.call('AgentRequest.Reset');
	});
});