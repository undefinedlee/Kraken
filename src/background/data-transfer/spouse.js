var splitAddress = require("lib/split-address");

module.exports = function(data){
	var Spouse = {};

	var spouseInfo = data.spouseInfo;

	if(spouseInfo){
		Spouse.Surname = spouseInfo.peopleName.surnName;
		Spouse.GivenName = spouseInfo.peopleName.givenName;
		Spouse.Birth = spouseInfo.birth.birthDate;
		Spouse.Nationality = spouseInfo.spouseNationality;
		Spouse.Country = spouseInfo.birth.country;
		Spouse.CityUnknow = !spouseInfo.birth.city;
		if(!Spouse.CityUnknow){
			Spouse.City = spouseInfo.birth.city;
		}
		Spouse.AddressType = spouseInfo.addressSelection;
		if(Spouse.AddressType === "O"){
			// Spouse.AddressLine1 = spouseInfo.address.street;
			splitAddress(spouseInfo.address.street, Spouse, ["AddressLine1", "AddressLine2"]);
			Spouse.AddressCountry = spouseInfo.address.country;
			Spouse.AddressStateNA = !spouseInfo.address.province;
			if(!Spouse.AddressStateNA){
				Spouse.AddressState = spouseInfo.address.province;
			}
			Spouse.AddressCity = spouseInfo.address.city;
			Spouse.AddressZipCodeNA = !spouseInfo.address.postCode;
			if(!Spouse.AddressZipCodeNA){
				Spouse.AddressZipCode = spouseInfo.address.postCode;
			}
		}
	}

	return {
		Spouse: Spouse
	};
}