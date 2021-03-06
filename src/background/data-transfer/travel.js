var splitAddress = require("lib/split-address");

module.exports = function(data){
	var Travel = {};

	var travelInfo = data.travelInfo;

	Travel.SpecificTravel = travelInfo.madePlan;
	if(Travel.SpecificTravel){
		Travel.ArriveDate = travelInfo.itinerary.arrivalDate;
		Travel.ArriveFlight = travelInfo.itinerary.arrivalFlight;
		Travel.ArriveCity = travelInfo.itinerary.arrivalCity;
		Travel.DepartDate = travelInfo.itinerary.departureDate;
		Travel.DepartFlight = travelInfo.itinerary.departureFlight;
		Travel.DepartCity = travelInfo.itinerary.departureCity;
		Travel.SpectravelLocations = travelInfo.itinerary.visitLocations.map(function(location){
			return {
				SpectravelLocation: location
			};
		});
	}else{
		Travel.IntendedDate = travelInfo.arrivalDate;
		Travel.TravelLengthOfStay = travelInfo.stayTime;
		Travel.TravelLengthOfStayCD = travelInfo.stayUnit;
	}

	// Travel.StayStreetAddress1 = travelInfo.stayInfo.street;
	splitAddress(travelInfo.stayInfo.street, Travel, ["StayStreetAddress1", "StayStreetAddress2"])
	Travel.StayState = travelInfo.stayInfo.state;
	Travel.StayCity = travelInfo.stayInfo.city;
	Travel.StayZIPCode = travelInfo.stayInfo.zipCode;

	Travel.WhoIsPaying = travelInfo.payFeeType;
	if(Travel.WhoIsPaying === "O"){
		Travel.PayerSurname = travelInfo.payPerson.surnName;
		Travel.PayerGivenName = travelInfo.payPerson.givenName;
		Travel.PayerPhone = travelInfo.payPerson.telephone;
		Travel.PayerEmailNA = !travelInfo.payPerson.email;
		Travel.PayerEmail = travelInfo.payPerson.email;
		Travel.PayerRelationship = travelInfo.payPerson.relationship;
		Travel.PayerAddrSameAsInd = travelInfo.payPerson.sameAddrees;
		if(!Travel.PayerAddrSameAsInd){
			// Travel.PayerStreetAddress1 = travelInfo.payPerson.address.street;
			splitAddress(travelInfo.payPerson.address.street, Travel, ["PayerStreetAddress1", "PayerStreetAddress2"]);
			Travel.PayerCountry = travelInfo.payPerson.address.country;
			Travel.PayerStateProvinceNA = !travelInfo.payPerson.address.province;
			if(!Travel.PayerStateProvinceNA){
				Travel.PayerStateProvince = travelInfo.payPerson.address.province;
			}
			Travel.PayerCity = travelInfo.payPerson.address.city;
			Travel.PayerPostalZIPCodeNA = !travelInfo.payPerson.address.postCode;
			if(!Travel.PayerPostalZIPCodeNA){
				Travel.PayerPostalZIPCode = travelInfo.payPerson.address.postCode;
			}
		}
	}else if(Travel.WhoIsPaying === "C"){
		Travel.PayingCompany = travelInfo.payOrganization.name;
		Travel.PayerPhone = travelInfo.payOrganization.telephone;
		Travel.PayingCompanyRelation = travelInfo.payOrganization.relationship;
		// Travel.PayerStreetAddress1 = travelInfo.payOrganization.address.street;
		splitAddress(travelInfo.payOrganization.address.street, Travel, ["PayerStreetAddress1", "PayerStreetAddress2"]);
		Travel.PayerCity = travelInfo.payOrganization.address.city;
		Travel.PayerStateProvince = travelInfo.payOrganization.address.province;
		Travel.PayerStateProvinceNA = !travelInfo.payOrganization.address.province;
		Travel.PayerPostalZIPCode = travelInfo.payOrganization.address.postCode;
		Travel.PayerPostalZIPCodeNA = !travelInfo.payOrganization.address.postCode;
		Travel.PayerCountry = travelInfo.payOrganization.address.country;
	}

	return {
		Travel: Travel
	};
}