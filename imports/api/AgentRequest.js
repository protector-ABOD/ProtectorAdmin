import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const SkillList = new Mongo.Collection('Skill',{idGeneration: 'MONGO'});
export const AgentList = new Mongo.Collection('Agent',
	{
		idGeneration: 'MONGO',
		transform: function(agent){
			agent.SubmissionDate = new Date(agent.CreatedDateTime).toDateString();
			return agent;
		}
	});
export const RaceList = new Mongo.Collection('Race', {idGeneration: 'MONGO'});

if(Meteor.isServer){
	Meteor.publish('Agent', function(){
		return AgentList.find();
	});
	
	Meteor.publish('Skill', function(){
		return SkillList.find();
	});

	Meteor.publish('Race', function(){
		return RaceList.find();
	});
}

Meteor.methods({
	'AgentRequest.Insert'({AgentName, UserID}){
	},
	
	'AgentRequest.Shortlist'({id, UserID}){
		AgentList.update({_id: id}, {$set :{ApplicationStatus : "Shortlisted", ApprovalActionBy: UserID, EditedDateTime : new Date()}});
		alert('Agent Shortlisted');
	},

	'AgentRequest.Approve'({id, UserID}){
		AgentList.update({_id: id}, {$set :{ApplicationStatus : "Approved", ApprovalActionBy: UserID, EditedDateTime : new Date()}});
		alert('Agent Approved');
	},
	
	'AgentRequest.Reject'({id, remark, UserID}){
		AgentList.update({_id: id}, {$set :{ApplicationStatus : "Rejected", "Remark": remark, ApprovalActionBy: UserID, EditedDateTime : new Date()}});
		alert('Agent Rejected');
	},
	
	'AgentRequest.KIV'({id, remark, UserID}){
		AgentList.update({_id: id}, {$set :{ApplicationStatus : "Keep in View", "Remark": remark, ApprovalActionBy: UserID, EditedDateTime : new Date()}});
		alert('Agent KIV');
	},

	'AgentRequest.Reset'(){
		AgentList.update({}, {$set: {ApplicationStatus : "Submitted", Remark : null}}, {multi: true});
	},

	'AgentRequest.UpdateProfile'({
		id, Race, Height, Weight, MobileNumber, Email, Address, City, State, Postcode, Country,
		emergencyContactFullName, emergencyContactMobileNumber, emergencyContactRelationship,
		UserID
	}){
		console.log(emergencyContactFullName +', '+emergencyContactMobileNumber+', '+ emergencyContactRelationship);
		AgentList.update({_id : id}, {
			$set :{
				Race: Race,
				Height: Height, 
				Weight: Weight, 
				MobileNumber: MobileNumber, 
				Email: Email, 
				Address: Address, 
				AddressCity: City,
				AddressState: State,
				AddressPostcode: Postcode,
				AddressCountry: Country,
				EmergencyContact: [{
					emergencyContactFullName: emergencyContactFullName,
					emergencyContactRelationship: emergencyContactRelationship,
					emergencyContactMobileNumber: emergencyContactMobileNumber
				}],
				EditedBy: UserID,
				EditedDateTime: new Date()
			}},function( error, result) { 
		    if ( error ) console.log ( error ); //info about what went wrong
		    if ( result ) Session.set("SaveStatus", "Success"); //the _id of new object if successful
		  });
	}
});