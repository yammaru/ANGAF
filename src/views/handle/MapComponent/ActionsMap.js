import NameActions from "./NameActions";

let markers = [];
const findLocation = (query, zoom) => {
	ClearMarker();
	window.L.mapquest.geocoding().geocode(query, (error, response) => {
		response.results.forEach((result, res_index) => {
			result.locations.forEach(location => {
				const {latLng} = location;
				if (res_index === 0) {
					SetCenter(latLng.lat, latLng.lng, zoom);
				}
			});
		});
	});
}
const findLocationWithLatLng = ( zoom, latLng) => {
	ClearMarker();
	SetCenter(latLng.lat, latLng.lng, zoom);
}
const findLocationAndMarker = (query, zoom) => {
	ClearMarker();
	window.L.mapquest.geocoding().geocode(query, (error, response) => {
		response.results.forEach((result, res_index) => {
			result.locations.forEach(location => {
				const {geocodeQuality, latLng} = location;
				if (res_index === 0 && geocodeQuality === "CITY") {
					SetCenter(latLng.lat, latLng.lng, zoom);
					markers.push(AddMarker(latLng.lat, latLng.lng));
				}
			});
		});
	});
}
const SetCenter = (lat, lng, zoom) => {
	window.L.mapquest.Map.getMap('map').setView(new window.L.LatLng(lat, lng), zoom);
}
const ClearMarker = () => {
	markers.forEach(marker => {
		window.L.mapquest.Map.getMap('map').removeLayer(marker);
	});
	markers = [];
}
const AddMarker = (lat, lng) => {
	return window.L.mapquest.textMarker(
		new window.L.LatLng(lat, lng), {
			text: '',
			subtext: '',
			position: 'right',
			type: 'marker',
			icon: {
				primaryColor: '#333333',
				secondaryColor: '#333333',
				size: 'sm'
			}
		}
	).addTo(window.L.mapquest.Map.getMap('map'));
}


const ActionsMap = (query,latLng, action, zoom,) => {
	switch (action) {
		case NameActions.Find_Location:
			findLocation(query, zoom);
			break;
		case NameActions.Find_Location_by_latlng:
			findLocationWithLatLng(zoom,latLng);
			break
		case NameActions.Maker_Location:
			findLocationAndMarker(query, zoom);
			break;
		default:
			break;
	}
}
export default ActionsMap;