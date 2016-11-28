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

if(Meteor.isServer){
	Meteor.publish('Agent', function(){
		return AgentList.find();
	});
	
	Meteor.publish('Skill', function(){
		return SkillList.find();
	});
}

Meteor.methods({
	'AgentRequest.Insert'({AgentName, UserID}){
		// console.log(UserID);
		// check(AgentName, String);
		// AgentList.insert({
		// 	First_Name: AgentName,
		// 	Last_Name: 'Cheah',
		// 	IC_Number: '000000-00-0000',
		// 	Date_Of_Birth: '00/00/0000',
		// 	Gender: "Male",
		// 	Email: AgentName + "@hotmail.com",
		// 	Contact_Number: "0164070811",
		// 	Status_ID: 1,
		// 	Remark: null,
		// 	Created_DateTime: new Date(),
		// 	Created_By: UserID,
		// 	Last_Edited_DateTime: new Date(),
		// 	Last_Edited_By: UserID,
		// 	Approval_Action_By: null,
		// 	Skill: [{
		// 				Skill_ID : SkillList.findOne({"Skill_Name" : "Karate"})._id,
		// 				Proficiency_ID : 1
		// 			}]
		// });
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
	}
});