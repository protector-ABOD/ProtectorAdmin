import { Template } from 'meteor/templating';
import { AgentRequestList } from '../api/AgentRequest.js';

import './AgentRequestList.html';

Template.AgentListing.helpers({
	PendingApprovalAgent(){
		return AgentRequestList.find({$and: [{StatusID : 1}]}, {});//Meteor.user().services.facebook.id}]}, {});
	},
	ApprovedAgent(){
		return AgentRequestList.find({$and: [{StatusID : 2}, {ApprovalActionBy : Meteor.userId()}]}, {});//Meteor.user().services.facebook.id}]}, {});
	},
	RejectedAgent(){
		return AgentRequestList.find({$and: [{StatusID : 3}, {ApprovalActionBy : Meteor.userId()}]}, {});//Meteor.user().services.facebook.id}]}, {});
	},
	KIVAgent(){
		return AgentRequestList.find({$and: [{StatusID : 4}, {ApprovalActionBy : Meteor.userId()}]}, {});//Meteor.user().services.facebook.id}]}, {});
	},
	PendingApprovalSettings: function () {
        return {
            rowsPerPage: 4,
            showFilter: true,
            fields: [
				{ key: 'Name', label: 'Name', tmpl: Template.RequestAgentName},
				{ key: 'Gender', label: 'Gender' },
				{ key: 'ICNumber', label:'IC Number' },
				{ key: '', headerClass: 'col-action-delete-header', tmpl: Template.PendingApprovalListAction}
			]
        };
    },
	ApprovedAgentSettings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
				{ key: 'Name', label: 'Name' },
				{ key: 'Gender', label: 'Gender' },
				{ key: 'ICNumber', label:'IC Number' },
				// { key: '', headerClass: 'col-action-delete-header', tmpl: Template.ApprovalAction}
			]
        };
    },
	RejectedAgentSettings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
				{ key: 'Name', label: 'Name' },
				{ key: 'Gender', label: 'Gender' },
				{ key: 'ICNumber', label:'IC Number' },
				{ key: 'Remark', label:'Remark' },
				{ key: '', headerClass: 'col-action-delete-header', tmpl: Template.RejectedListAction}
			]
        };
    },
	KIVAgentSettings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
				{ key: 'Name', label: 'Name' },
				{ key: 'Gender', label: 'Gender' },
				{ key: 'ICNumber', label:'IC Number' },
				{ key: 'Remark', label:'Remark' },
				{ key: '', headerClass: 'col-action-delete-header', tmpl: Template.KIVListAction}
			]
        };
    }
});

Template.PendingApprovalListAction.events({
	'click .ApproveAgent'(){
		Meteor.call('AgentRequest.Approve', {
			id: this._id,
			UserID: Meteor.userId()
		});
	},
	'click .RejectAgent'(){
		console.log(this._id);
		// var RejectReason = prompt("Reason:", "");
		// Meteor.call('AgentRequest.Reject', {
		// 	id: this._id,
		// 	remark: RejectReason,
		// 	UserID: Meteor.userId()
		// });
	},
	'click .KIVAgent'(){
		var KIVReason = prompt("Reason:", "");
		Meteor.call('AgentRequest.KIV', {
			id: this._id,
			remark: KIVReason,
			UserID: Meteor.userId()
		});
	},
	'click ViewAgentProfile'(){

	}
});

Template.RejectedListAction.events({
	'click .ApproveAgent'(){
		Meteor.call('AgentRequest.Approve', {
			id: this._id,
			UserID: Meteor.userId()
		});
	},
	'click .KIVAgent'(){
		var KIVReason = prompt("Reason:", "");
		Meteor.call('AgentRequest.KIV', {
			id: this._id,
			remark: KIVReason,
			UserID: Meteor.userId()
		});
	},
});

Template.KIVListAction.events({
	'click .ApproveAgent'(){
		Meteor.call('AgentRequest.Approve', {
			id: this._id,
			UserID: Meteor.userId()
		});
	},
	'click .RejectAgent'(){
		var RejectReason = prompt("Reason:", "");
		Meteor.call('AgentRequest.Reject', {
			id: this._id,
			remark: RejectReason,
			UserID: Meteor.userId()
		});
	},
});

Template.RequestAgentName.helpers({
	SelectedAgent(){
		return Session.get('SelectedAgent');
	},
});

Template.RequestAgentName.events({
	'click .ViewAgentProfile'(){
		var SelectedAgent = AgentRequestList.findOne({_id : this._id}, {});
		Session.set('SelectedAgent', SelectedAgent);
	}
});