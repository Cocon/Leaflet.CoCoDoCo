import L from 'leaflet';

export const getElevation = (latlng: L.LatLng): Promise<{ elevation: number | string, hsrc: string }> => {
	// 国土地理院APIにアクセス
	// http://maps.gsi.go.jp/development/elevation_s.html
	const endPoint = "https://cyberjapandata2.gsi.go.jp/general/dem/scripts/getelevation.php";
	return fetch(endPoint + `?outtype=JSON&lon=${latlng.lng}&lat=${latlng.lat}`).then(response => {
		return response.json();
	})
}
