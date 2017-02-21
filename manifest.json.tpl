{
	"name": "Kraken",
	"version": "0.1",
	"manifest_version": 2,
	"description": "签证信息自动填写",
	"permissions": ["contextMenus"],
	"icons": {
		"16": "images/icon-16.png",
		"48": "images/icon-48.png"
	},
	"browser_action": {
		"default_icon": "images/icon-32.png",
		"default_title": "Kraken"
	},
	"background": {
		"scripts": ["background.js"]
	},
	"content_scripts": [
		{
			"matches": ["https://ceac.state.gov/genniv/default.aspx", "https://ceac.state.gov/GenNIV/Default.aspx", "https://ceac.state.gov/GenNIV/default.aspx"],
			"js": ["home.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/Common/ConfirmApplicationID.aspx?node=SecureQuestion"],
			"js": ["secure-question.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_personal.aspx?node=Personal1"],
			"js": ["personal1.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_personalcont.aspx?node=Personal2"],
			"js": ["personal2.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_contact.aspx?node=AddressPhone"],
			"js": ["address-phone.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/Passport_Visa_Info.aspx?node=PptVisa"],
			"js": ["passport.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_travel.aspx?node=Travel"],
			"js": ["travel.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_travelcompanions.aspx?node=TravelCompanions"],
			"js": ["travel-companions.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_previousustravel.aspx?node=PreviousUSTravel"],
			"js": ["previous-us-travel.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_uscontact.aspx?node=USContact"],
			"js": ["us-contact.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_family1.aspx?node=Relatives"],
			"js": ["relatives.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_family2.aspx?node=Spouse"],
			"js": ["spouse.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_family4.aspx?node=PrevSpouse"],
			"js": ["prev-spouse.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_workeducation1.aspx?node=WorkEducation1"],
			"js": ["work-education.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_workeducation2.aspx?node=WorkEducation2"],
			"js": ["work-education2.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_workeducation3.aspx?node=WorkEducation3"],
			"js": ["work-education3.js"]
		}, {
			"matches": ["https://ceac.state.gov/GenNIV/General/complete/complete_securityandbackground1.aspx?node=SecurityandBackground1"],
			"js": ["securityand-background1.js"]
		}
	]
}
