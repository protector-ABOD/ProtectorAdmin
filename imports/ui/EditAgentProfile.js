import { Template } from 'meteor/templating';
import { AgentList } from '../api/AgentRequest.js';
import { RaceList } from '../api/AgentRequest.js';

import './EditAgentProfile.html';

Template.EditAgentProfile.onCreated(function siteOnCreated() {
	Session.set("SearchedAgentNRIC", "");
	Meteor.subscribe('Agent');
	Meteor.subscribe('Race');
	var SelectedAgent;
});

Template.EditAgentProfile.events({
	'submit #custom-search-form' : function(event){
		event.preventDefault();
		var NRIC = $('.search-query').val();
		Session.set("SearchedAgentNRIC", NRIC);
		return false;
	},
	'click #SaveProfile'(){
		var ddlRace = document.getElementById("ddlRace");
		var Race = ddlRace.options[ddlRace.selectedIndex].value;
		var Weight = $('#Weight').val().split("kg")[0].trim();
		var Height = $('#Height').val().split("cm")[0].trim();
		var Email = $('#Email').val();
		var MobileNumber = $('#MobileNumber').val();
		var Address = $('#Address').val();
		var City = $('#City').val();
		var State = $('#State').val();
		var Postcode = $('#Postcode').val();
		var Country = $('#Country').val();
		var emergencyContactFullName = $('#emergencyContactFullName').val();
		var emergencyContactRelationship = $('#emergencyContactRelationship').val();
		var emergencyContactMobileNumber = $('#emergencyContactMobileNumber').val();

		var id = AgentList.findOne({$and : [{NRIC : Session.get("SearchedAgentNRIC")}]})._id;
		
		Meteor.call('AgentRequest.UpdateProfile', {
			id: id,
			Race: Race,
			Height: Height, 
			Weight: Weight, 
			MobileNumber: MobileNumber,
			Email: Email,
			Address: Address,
			City: City,
			State: State, 
			Postcode: Postcode,
			Country: Country,
			emergencyContactFullName: emergencyContactFullName,
			emergencyContactRelationship: emergencyContactRelationship,
			emergencyContactMobileNumber: emergencyContactMobileNumber,
			UserID: Meteor.userId()
		});

		$("#SaveModal").modal();
	},
});

Template.EditAgentProfile.helpers({
	SearchedAgent(){
		SelectedAgent = AgentList.findOne({$and : [{NRIC : Session.get("SearchedAgentNRIC"), ApplicationStatus : {$ne : "Submitted"}}]});
		if(SelectedAgent != null)
			$("#ddlRace").val(SelectedAgent.Race);
		else
			$("#ddlRace").selectedIndex = 0;
		return SelectedAgent;
	},
	AgentRace(){
		return Session.get("AgentRace");
	},
	RaceItem(){
		return RaceList.find();
	}
});

Template.SaveModalTemplate.helpers({ 
	SaveStatus(){
		if (Session.get("SaveStatus") == "Success")
			return "Save Successful.";
		else
			return "Record fail to save."
	}
})