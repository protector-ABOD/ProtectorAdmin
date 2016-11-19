import { Template } from 'meteor/templating';
 
import './masterNavbar.html';
 
Template.masterNavbar.helpers({
});

Template.masterNavbar.onRendered(function() {
	/* autocomplete search */
	var countries = [{ value: 'Andorra', data: 'AD' }, { value: 'Zimbabwe', data: 'ZZ' }];

	$('#search').autocomplete({
	  lookup: countries
	});

	$(".navbar-toggle").bind("click", function (e) {
	  $("#navbar").toggleClass("active");
	  $(".app-container").toggleClass("__navbar");
	});

	$("#facebook-login").bind("click", function (e) {
		Meteor.loginWithFacebook({}, function(err){
			if (err) {
				throw new Meteor.Error("Facebook login failed");
			}
		});
	});

	$(".logoutButton").bind("click", function(e) {
		Meteor.logout(function(err){
			if (err) {
				throw new Meteor.Error("Logout failed");
			}
		})
	});
});

Template.masterNavbar.events({
	'click #logout': function(event) {
		Meteor.logout(function(err){
			if (err) {
				throw new Meteor.Error("Logout failed");
			}
		})
	},
});