import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const AgentRequestList = new Mongo.Collection('AgentRequest',{idGeneration: 'MONGO'});

Meteor.methods({
	'AgentRequest.Insert'({AgentName, UserID}){
		// console.log(UserID);
		check(AgentName, String);
		AgentRequestList.insert({
			"Name": AgentName,
			"StatusID": 1,
			"Remark": null,
			CreatedDateTime: new Date(),
			CreatedBy: null,
			ApprovalActionBy: null
		});
	},
	
	'AgentRequest.Approve'({id, UserID}){
		AgentRequestList.update({_id: id}, {$set :{"StatusID": 2, ApprovalActionBy: UserID}});
		alert('Agent Approved');
	},
	
	'AgentRequest.Reject'({id, remark, UserID}){
		AgentRequestList.update({_id: id}, {$set :{"StatusID": 3, "Remark": remark, ApprovalActionBy: UserID}});
		alert('Agent Rejected');
	},
	
	'AgentRequest.KIV'({id, remark, UserID}){
		AgentRequestList.update({_id: id}, {$set :{"StatusID": 4, "Remark": remark, ApprovalActionBy: UserID}});
		alert('Agent KIV');
	},
	'AgentRequest.Reset'(){
		AgentRequestList.update({StatusID : {$ne : 1}}, {$set: {StatusID : 1, Remark : null}}, {multi: true});
	}
});