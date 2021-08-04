import L from 'leaflet';
import { openReverseGeocoder } from '@geolonia/open-reverse-geocoder';
import './style.css';

export class CocoDoco extends L.Control {
	container: HTMLDivElement | null;
	constructor(options?: L.ControlOptions) {
		super(options);
		this.container = null;
	}

	onAdd = (map: L.Map) => {
		this.container = L.DomUtil.create("div", "leaflet-cocodoco");
		const button = L.DomUtil.create("button", "leaflet-cocodoco-button", this.container);
		L.DomEvent.on(button, "click", () => {
			if (button.classList.contains("enabled")) {
				button.classList.remove("enabled");
				this.onButtonDisabled(map);
			} else {
				button.classList.add("enabled");
				this.onButtonEnabled(map);
			}
		})
		return this.container;
	}

	fetchData = (latlng: L.LatLng): HTMLElement => {
		openReverseGeocoder([latlng.lng, latlng.lat]).then((result: any) => {
			tableBody.appendChild(createRow("住所", result.prefecture + result.city));
		}).catch((err: any) => {
			console.error(err);
			tableBody
		})

		const popupContainer = document.createElement("table");
		const tableBody = document.createElement("tbody");
		const createRow = (label: string, value: any) => {
			const row = document.createElement("tr");
			const cell1 = document.createElement("td");
			cell1.innerText = label;
			row.appendChild(cell1);
			const cell2 = document.createElement("td");
			cell2.innerText = value;
			row.appendChild(cell2);
			return row;
		}
		return popupContainer;
	}
	onButtonEnabled = (map: L.Map) => {
		map.getContainer().style.cursor = "crosshair";
		map.on({
			// マウスの右クリックorタッチデバイスでの同一地点長押し
			contextmenu: (event) => {
				console.log(event.latlng);
				const marker = L.marker(event.latlng);
				marker.bindPopup("")
			}
		})
	}
	onButtonDisabled = (map: L.Map) => {
		map.getContainer().style.cursor = "";
	}
}