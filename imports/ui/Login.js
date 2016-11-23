import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Accounts } from 'meteor/accounts-base'

import '../../style/Login.css';
// import '../../style/merged-stylesheets.css';
import './Login.html';

Template.login.events({
    'click #login-form-link' : function(e, t){
      $("#login-form").delay(100).fadeIn(100);
      $("#login-buttons").delay(100).fadeIn(100);
      $("#register-form").fadeOut(100);
      $('#register-form-link').removeClass('active');
      $('#login-form-link').addClass('active');
      e.preventDefault();
    },
    'click #register-form-link' : function(e, t){
      $("#register-form").delay(100).fadeIn(100);
      $("#login-form").fadeOut(100);
      $("#login-buttons").fadeOut(100);
      $('#login-form-link').removeClass('active');
      $('#register-form-link').addClass('active');
      e.preventDefault();
    },
    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
        if (err){
          $("#loginFailModal").modal();
          //alert("Incorrect Username or Password");
          // throw new Meteor.Error("Incorrect Username or Password");
        }
      });
         return false; 
    },
    'submit #register-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var username = t.find('#username').value
        , email = t.find("#email").value
        , password = t.find("#password").value

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Accounts.createUser({
          email: email,
          password: password,
          profile:{name: username}
        }, function(err){
        if (err){
          $("#registrationFailModal").modal();
        }
      });
         return false; 
    },
    'click #facebook-login': function(event) {
		Meteor.loginWithFacebook({}, function(err){
			if (err) {
				throw new Meteor.Error("Facebook login failed");
			}
		});
	},
 
	'click #logout': function(event) {
		Meteor.logout(function(err){
			if (err) {
				throw new Meteor.Error("Logout failed");
			}
		})
	},
});