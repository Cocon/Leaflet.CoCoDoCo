import L from 'leaflet';
import 'leaflet-easybutton';
import '@fortawesome/fontawesome-free';

export class CocoDoco {
	map: L.Map;
	constructor(mapInstance: L.Map, options?: L.ControlOptions) {
		this.map = mapInstance;
		L.easyButton({
			position: options?.position || "topright",
			leafletClasses: true,
			states: [this.buttonEnabled, this.buttonUnabled]
		}).addTo(this.map);
	}
	buttonEnabled: L.EasyButtonState = {
		stateName: "enabled",
		icon: "fa-location-dot",
		title: "hogehoge",
		onClick: () => { alert("hoge") }
	}
	buttonUnabled: L.EasyButtonState = {
		stateName: "disabled",
		icon: "fa-rotate-left",
		title: "piyopiyo",
		onClick: () => { alert("piyo") }
	}
}