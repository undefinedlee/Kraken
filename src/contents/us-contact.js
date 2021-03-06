// @entry
var Page = require("lib/page");
var Type = require("lib/type");

Page("USContact", {
	controls: [
		'tctl00$ucNavigateOption$ucNavPanel$updConfirm',
		'tctl00$SiteContentPlaceHolder$FormView1$upnlPOC'
	],
	entity: {
		"Surname": {},
		"GivenName": {},
		"NameNA": {
			"type": Type.Bool
		},
		"Organization": {},
		"OrganizationNA": {
			"type": Type.Bool
		},
		"Relationship": {
			"type": Type.Enum,
			"event-target": "ctl00$SiteContentPlaceHolder$FormView1$ddlUS_POC_REL_TO_APP",
			"subs": {
				"__ALL__": {
					"Address1": {},
					"Address2": {},
					"City": {},
					"State": {
						"type": Type.Enum
					},
					"ZipCode": {},
					"PhoneNum": {},
					"Email": {},
					"EmailNA": {
						"type": Type.Bool
					}
				}
			}
		}
	},
	hash: {
		"Surname": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_SURNAME",
		"GivenName": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_GIVEN_NAME",
		"NameNA": "ctl00$SiteContentPlaceHolder$FormView1$cbxUS_POC_NAME_NA",
		"Organization": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_ORGANIZATION",
		"OrganizationNA": "ctl00$SiteContentPlaceHolder$FormView1$cbxUS_POC_ORG_NA_IND",
		"Relationship": "ctl00$SiteContentPlaceHolder$FormView1$ddlUS_POC_REL_TO_APP",
		"Address1": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_ADDR_LN1",
		"Address2": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_ADDR_LN2",
		"City": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_ADDR_CITY",
		"State": "ctl00$SiteContentPlaceHolder$FormView1$ddlUS_POC_ADDR_STATE",
		"ZipCode": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_ADDR_POSTAL_CD",
		"PhoneNum": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_HOME_TEL",
		"Email": "ctl00$SiteContentPlaceHolder$FormView1$tbxUS_POC_EMAIL_ADDR",
		"EmailNA": "ctl00$SiteContentPlaceHolder$FormView1$cbxUS_POC_EMAIL_ADDR_NA"
	}
});