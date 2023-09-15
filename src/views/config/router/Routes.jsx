import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./../../pages/dashboard/index";
// settings
import Profiles from "./../../pages/settings/profiles/index";
import Users from "./../../pages/settings/users/index";
import Advisers from "./../../pages/settings/advisers/index";
import GeneralActivities from "./../../pages/settings/generalActivities/index";
import Affiliates from "./../../pages/settings/affiliates/index";
import PlacesOfCare from "./../../pages/settings/placesOfCare/index";
import Channels from "./../../pages/settings/channels/index";
import RecordType from "./../../pages/settings/recordType/index";
import TypeActivities from "./../../pages/settings/typeActivities/index";
import Occupation from "../../pages/settings/occupation/index";
import PriceRange from "./../../pages/settings/priceRange/index";
import AdvertisingImages from "./../../pages/settings/advertisingImages/index";
import Modules from "./../../pages/settings/modules/index";
import SystemAudit from "./../../pages/settings/systemAudit/index";
import Mistakes from "./../../pages/settings/mistakes/index";
import GeneralSettings from "./../../pages/settings/generalSettings/index";
//customer
import Client from "./../../pages/clients/listClient/index";
import ProjectsClassifications from "../../pages/settings/ProjectsClassifications";
import DirectCollectionsConsignmentConcept from "../../pages/settings/DirectCollectionsConsignmentConcept";
import index from "../../pages/index";
import FilterPage from "../../pages/FilterPage";
import HomePage from "../../HomePage";
import Products from "../../pages/products";
import Tiendas from "../../pages/tiendas";
import LockBookPage from "../../pages/lookbook";
import LookbookSectionPage from "../../pages/lookbook/LookbookSection";
import Checkout from "../../pages/checkout";
import Shipping from "../../pages/checkout/shipping";
import LoginSeccion from "../../components/Auth/LoginSeccion/LoginSeccion";

const Routes = ({}) => {
	return (
		<Switch>
			<Route exact path="/" component={index} />
			<Route exact path="/hombre" component={FilterPage} />
			<Route exact path="/mujer" component={FilterPage} />
			<Route exact path="/cosas" component={FilterPage} />
			<Route exact path="/cosas" component={FilterPage} />
			<Route exact path="/login" component={LoginSeccion} />
			<Route exact path="/tiendas" component={Tiendas} />
			<Route exact path="/kids" component={FilterPage} />
			<Route exact path="/lockbook" component={LockBookPage} />
			<Route exact path="/lockbook/:id" component={LookbookSectionPage} />
			<Route exact path="/producto/:id" component={Products} />
			<Route exact path="/checkout" component={Checkout} />
			<Route exact path="/checkout/shipping" component={Shipping} />
			{/* dashboard */}
			<Route exact path="/dashboard" component={Dashboard} />
			{/* settings */}
			<Route exact path="/settings/profiles" component={Profiles} />
			<Route exact path="/settings/users" component={Users} />
			<Route exact path="/settings/advisers" component={Advisers} />
			<Route
				exact
				path="/settings/general-activities/:id"
				component={GeneralActivities}
			/>
			<Route
				exact
				path="/settings/general-activities"
				component={GeneralActivities}
			/>
			<Route exact path="/settings/affiliates" component={Affiliates} />
			<Route
				exact
				path="/settings/places-of-care"
				component={PlacesOfCare}
			/>
			<Route exact path="/settings/channels" component={Channels} />
			<Route exact path="/settings/record-type" component={RecordType} />
			<Route
				exact
				path="/settings/type-activities"
				component={TypeActivities}
			/>
			<Route exact path="/settings/occupation" component={Occupation} />
			<Route exact path="/settings/price-range" component={PriceRange} />
			<Route
				exact
				path="/settings/advertising-images"
				component={AdvertisingImages}
			/>
			<Route exact path="/settings/modules" component={Modules} />
			<Route
				exact
				path="/settings/system-audit"
				component={SystemAudit}
			/>
			<Route exact path="/settings/mistakes" component={Mistakes} />
			<Route
				exact
				path="/settings/general-settings"
				component={GeneralSettings}
			/>
			<Route
				exact
				path="/settings/direct-collections-consignment-concept"
				component={DirectCollectionsConsignmentConcept}
			/>
			<Route
				exact
				path="/settings/projects-classifications"
				component={ProjectsClassifications}
			/>

			{/* customer */}
			<Route exact path="/customer/client" component={Client} />
			{/* Redirect */}
			<Redirect to="/" />
		</Switch>
	);
};

export default Routes;
