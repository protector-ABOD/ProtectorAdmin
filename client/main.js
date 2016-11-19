import '../imports/ui/body.js';

if (Meteor.isClient){
	//setting default page
	Session.setDefault('page', 'dashboard');
}