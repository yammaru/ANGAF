import { combineReducers } from "redux";

import user from "./Configuration/authReducer";
import loading from "./Configuration/loading";
import users from "./Configuration/usersReducer";
import afiliatedCompany from "./Configuration/afiliatedCompanyReducer";
import activityType from "./Configuration/activityTypeReducer";
import channel from "./Configuration/channelReducer";
import attentionPlaces from "./Configuration/attentionPlacesReducer";
import occupation from "./Configuration/occupationReducer";
import profile from "./Configuration/profileReducer";
import registerType from "./Configuration/registerTypeReducer";
import advertisingImage from "./Configuration/advertisingImageReducer";
import assessor from "./Configuration/assesorReducer";
import auditsType from "./Configuration/auditsTypeReducer";
import caughtErrorAction from "./Configuration/caughtErrorReducer";
import generalActivity from "./Configuration/generalActivityReducer";
import generalSetting from "./Configuration/generalSettingReducer";
import md from "./Configuration/mdReducer"; /*Este es el reducer de Modules*/
import permission from "./Configuration/permissionReducer";
import pricesRange from "./Configuration/pricesRangeReducer";
import resource from "./Configuration/resourceReducer";
import systemAudit from "./Configuration/systemAuditReducer";
import projectsClassification from "./Configuration/projectsClassificationReducer";
import consignmentConcept from "./Configuration/ConsignmentConceptReducer";

//customer
import customer from "./Customer/customerReducer";
import activity from "./Customer/activityReducer";
import interestCustomer from "./Customer/interestReducer";

//coupons
import coupon from "./Configuration/couponReducer";

const rootReducer = combineReducers({
	user,
	loading,
	users,
	afiliatedCompany,
	activityType,
	channel,
	attentionPlaces,
	occupation,
	profile,
	registerType,
	advertisingImage,
	assessor,
	auditsType,
	caughtErrorAction,
	customer,
	generalActivity,
	generalSetting,
	md,
	permission,
	pricesRange,
	resource,
	systemAudit,
	activity,
	interestCustomer,
	coupon,
	projectsClassification,
	consignmentConcept,
});

export default rootReducer;
