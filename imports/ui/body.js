import { Template } from 'meteor/templating';

//js and modules
import 'bootstrap';
import autocomplete from 'devbridge-autocomplete';

//css
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/font-awesome/css/font-awesome.css';
import '../../node_modules/flag-icon-css/css/flag-icon.css';
import '../../node_modules/ionicons/dist/css/ionicons.css';
import '../../node_modules/spinkit/css/spinkit.css';
import '../../node_modules/chartist/dist/chartist.css';
import '../../public/css/flat-admin.css';

//add imports for all page templates
import './masterSidebar.js';
import './masterNavbar.js';
import './masterFooter.js';
import './floatingActionButton.js';
import './dashboard.js';
import './AgentRequestList.js';
import './EditAgentProfile.js';
import './Login.js';
import './body.html';

//collections
import { AgentRequest } from '../api/AgentRequest.js';

Template.body.helpers({
	currentPage: function(){
		return Session.get('page');
	},
});

Template.body.onRendered(function(){

});

Template.body.onCreated(function bodyOnCreated(){
	// this.state = new ReactiveDict();
	Meteor.logout(function(err){
		if (err) {
			throw new Meteor.Error("Logout failed");
		}
	})
	Session.set('page', 'AgentListing');
	
});
