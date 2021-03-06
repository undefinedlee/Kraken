// @entry
var Page = require("lib/page");
var Type = require("lib/type");

Page("Passport", {
	controls: [
		'tctl00$ucNavigateOption$ucNavPanel$updConfirm',
		'tctl00$SiteContentPlaceHolder$FormView1$UpdatePanel2',
		'tctl00$SiteContentPlaceHolder$FormView1$ctl02',
		'tctl00$SiteContentPlaceHolder$FormView1$UpdatePanel1'
	],
	entity: {
		"Type": {
			"type": Type.Enum,
			"default": "R"
		},
		"Number": {},
		"BookNumber": {},
		"BookNumberNA": {
			"type": Type.Bool
		},
		"Country": {
			"type": Type.Enum
		},
		"IssuedCity": {},
		"IssuedState": {},
		"IssuedCountry": {
			"type": Type.Enum
		},
		"IssuedDate": {
			"type": Type.Date
		},
		"ExpireDate": {
			"type": Type.Date
		},
		"ExpireNA": {
			"type": Type.Bool
		},
		"HasLostPassport": {
			"type": Type.YN,
			"default": "N",
			"event-target": {
				"Y": "ctl00$SiteContentPlaceHolder$FormView1$rblLOST_PPT_IND$0"
			},
			"subs": {
				"Y": {
					"LostPassports": {
						"type": Type.Array,
						"event-target": "ctl00$SiteContentPlaceHolder$FormView1$dtlLostPPT$ctl00$InsertButtonLostPPT",
						"item": {
							"Number": {},
							"NumberUnknow": {
								"type": Type.Bool
							},
							"Country": {
								"type": Type.Enum
							},
							"Explain": {}
						}
					}
				}
			}
		}
	},
	hash: {
		"Type": "ctl00$SiteContentPlaceHolder$FormView1$ddlPPT_TYPE",
		"Number": "ctl00$SiteContentPlaceHolder$FormView1$tbxPPT_NUM",
		"BookNumber": "ctl00$SiteContentPlaceHolder$FormView1$tbxPPT_BOOK_NUM",
		"BookNumberNA": "ctl00$SiteContentPlaceHolder$FormView1$cbxPPT_BOOK_NUM_NA",
		"Country": "ctl00$SiteContentPlaceHolder$FormView1$ddlPPT_ISSUED_CNTRY",
		"IssuedCity": "ctl00$SiteContentPlaceHolder$FormView1$tbxPPT_ISSUED_IN_CITY",
		"IssuedState": "ctl00$SiteContentPlaceHolder$FormView1$tbxPPT_ISSUED_IN_STATE",
		"IssuedCountry": "ctl00$SiteContentPlaceHolder$FormView1$ddlPPT_ISSUED_IN_CNTRY",
		"IssuedDate": {
			"Year": "ctl00$SiteContentPlaceHolder$FormView1$tbxPPT_ISSUEDYear",
			"Month": "ctl00$SiteContentPlaceHolder$FormView1$ddlPPT_ISSUED_DTEMonth",
			"Day": "ctl00$SiteContentPlaceHolder$FormView1$ddlPPT_ISSUED_DTEDay",
		},
		"ExpireDate": {
			"Year": "ctl00$SiteContentPlaceHolder$FormView1$tbxPPT_EXPIREYear",
			"Month": "ctl00$SiteContentPlaceHolder$FormView1$ddlPPT_EXPIRE_DTEMonth",
			"Day": "ctl00$SiteContentPlaceHolder$FormView1$ddlPPT_EXPIRE_DTEDay",
		},
		"ExpireNA": "ctl00$SiteContentPlaceHolder$FormView1$cbxPPT_EXPIRE_NA",
		"HasLostPassport": "ctl00$SiteContentPlaceHolder$FormView1$rblLOST_PPT_IND",
		"LostPassports.Number": "ctl00$SiteContentPlaceHolder$FormView1$dtlLostPPT$ctl0{0}$tbxLOST_PPT_NUM",
		"LostPassports.NumberUnknow": "ctl00$SiteContentPlaceHolder$FormView1$dtlLostPPT$ctl0{0}$cbxLOST_PPT_NUM_UNKN_IND",
		"LostPassports.Country": "ctl00$SiteContentPlaceHolder$FormView1$dtlLostPPT$ctl0{0}$ddlLOST_PPT_NATL",
		"LostPassports.Explain": "ctl00$SiteContentPlaceHolder$FormView1$dtlLostPPT$ctl0{0}$tbxLOST_PPT_EXPL"
	}
});