import { Template } from 'meteor/templating';
import { AgentList } from '../api/AgentRequest.js';
import { SkillList } from '../api/AgentRequest.js';

import './AgentRequestList.html';

Template.AgentListing.onCreated(function siteOnCreated() {
	Meteor.subscribe('Agent');
	Meteor.subscribe('Skill');
});

Template.AgentListing.helpers({
	PendingApprovalAgent(){
		return AgentList.find({$and: [{ApplicationStatus : "Submitted"}]}, {});
	},
	ShortlistedAgent(){
		return AgentList.find({$and: [{ApplicationStatus : "Shortlisted"}]}, {});	
	},
	ApprovedAgent(){
		return AgentList.find({$and: [{ApplicationStatus : "Approved"}]}, {});
	},
	RejectedAgent(){
		return AgentList.find({$and: [{ApplicationStatus : "Rejected"}]}, {});
	},
	KIVAgent(){
		return AgentList.find({$and: [{ApplicationStatus : "Keep in View"}]}, {});
	},
	PendingApprovalSettings: function () {
        return {
            rowsPerPage: 4,
            showFilter: true,
            fields: [
				{ key: 'FullName', label: 'Name', tmpl: Template.RequestAgentName},
				{ key: 'Gender', label: 'Gender' },
				{ key: 'NRIC', label:'IC Number' },
				{ key: 'MobileNumber', label:'Contact Number' },
				{ key: 'SubmissionDate', label:'Submission Date' },
				{ key: '', headerClass: 'col-action-delete-header', tmpl: Template.PendingApprovalListAction}
			]
        };
    },
    ShortlistedAgentSettings: function () {
        return {
            rowsPerPage: 4,
            showFilter: true,
            fields: [
				{ key: 'FullName', label: 'Name'},//, tmpl: Template.RequestAgentName},
				{ key: 'Gender', label: 'Gender' },
				{ key: 'NRIC', label:'IC Number' },
				{ key: 'MobileNumber', label:'Contact Number' },
				{ key: '', headerClass: 'col-action-delete-header', tmpl: Template.ShortlistListAction}
			]
        };
    },
	ApprovedAgentSettings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
				{ key: 'FullName', label: 'Name'},//, tmpl: Template.RequestAgentName},
				{ key: 'Gender', label: 'Gender' },
				{ key: 'NRIC', label:'IC Number' },
				{ key: 'MobileNumber', label:'Contact Number' },
				{ key: '', headerClass: 'col-action-delete-header', tmpl: Template.ApprovedListAction}
			]
        };
    },
	RejectedAgentSettings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
				{ key: 'FullName', label: 'Name'},//, tmpl: Template.RequestAgentName},
				{ key: 'Gender', label: 'Gender' },
				{ key: 'NRIC', label:'IC Number' },
				{ key: 'MobileNumber', label:'Contact Number' },
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
				{ key: 'FullName', label: 'Name'},//, tmpl: Template.RequestAgentName},
				{ key: 'Gender', label: 'Gender' },
				{ key: 'NRIC', label:'IC Number' },
				{ key: 'MobileNumber', label:'Contact Number' },
				{ key: 'Remark', label:'Remark' },
				{ key: '', headerClass: 'col-action-delete-header', tmpl: Template.KIVListAction}
			]
        };
    }
});

Template.PendingApprovalListAction.events({
	'click .ShortlistAgent'(){
		Meteor.call('AgentRequest.Shortlist', {
			id: this._id,
			UserID: Meteor.userId()
		});
	}
});

Template.ShortlistListAction.events({
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

Template.ApprovedListAction.events({
	'click .RejectAgent'(){
		var RejectReason = prompt("Reason:", "");
		Meteor.call('AgentRequest.Reject', {
			id: this._id,
			remark: RejectReason,
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
		// var x = Session.get('SelectedAgent');
		// console.log(Session.get('SelectedAgent'));
		return Session.get('SelectedAgent');
	},
});

Template.RequestAgentName.events({
	'click .ViewAgentProfile'(){
		var SelectedAgent = AgentList.findOne({_id : this._id}, {});
		Session.set('SelectedAgent', SelectedAgent);
	}
});