import L from 'leaflet';

export const getElevation = (latlng: L.LatLng): Promise<{ elevation: number | string, hsrc: string }> => {
	// 国土地理院APIにアクセス
	// http://maps.gsi.go.jp/development/elevation_s.html
	const endPoint = "https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php";
	return fetch(endPoint + `?outtype=JSON&lon=${latlng.lng}&lat=${latlng.lat}`).then(response => {
		return response.json();
	})
}
export const getCityName = (latlng: L.LatLng): Promise<{ code: string, prefecture: string, city: string }> => {
	const endPoint = "https://geo-api-server.herokuapp.com/reverseGeocoding";
	//return fetch(endPoint + `?lng=${latlng.lng}&lat=${latlng.lat}`).then(response => {
	return fetch(endPoint + `?lng=${latlng.lng}&lat=${latlng.lat}`).then(response => {
		return response.json();
	}).then(json => {
		if (json["Error"]) {
			return {
				code: "",
				prefecture: "",
				city: ""
			}
		} else {
			return json;
		}
	})
}