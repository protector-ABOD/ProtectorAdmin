import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './Login.html';
Template.login.events({
    '.click #login-button' : function(events){
      //e.preventDefault();
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.loginWithPassword(email, password, function(err){
        if (err){
          throw new Meteor.Error("Incorrect Username or Password");
        }
      });
         return false; 
    },
    '.click #signup-button' : function(events){
      e.preventDefault();
      var email = t.find('#login-email').value
        , password = t.find('#login-password').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.createUser(email, password, function(err){
        if (err){
          throw new Meteor.Error("Incorrect Username or Password");
        }
      });
         return false; 
    },
    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      //console.log(e.target.id);
      // var email = t.find('#login-email').value
      //   , password = t.find('#login-password').value;

      //   // Trim and validate your fields here.... 

      //   // If validation passes, supply the appropriate fields to the
      //   // Meteor.loginWithPassword() function.
      //   Meteor.loginWithPassword(email, password, function(err){
      //   if (err){
      //     throw new Meteor.Error("Incorrect Username or Password");
      //   }
      // });
      //    return false; 
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