import L from 'leaflet';
import './style.css';
import PopupContent from './PopupContent';
import { getElevation } from "./utils";

export class CocoDoco extends L.Control {
	container: HTMLDivElement | null;
	markers: L.Marker[] = [];
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

	onButtonEnabled = (map: L.Map) => {
		map.getContainer().style.cursor = "crosshair";
		map.on({
			// マウスの右クリックorタッチデバイスでの同一地点長押し
			contextmenu: async (event) => {
				// APIにアクセス
				const elevation = await getElevation(event.latlng);
				// マーカーを作成
				const marker = L.marker(event.latlng);
				// ポップアップを作成
				const popup = L.popup().setContent(new PopupContent({
					"緯度": event.latlng.lat,
					"経度": event.latlng.lng,
					"標高": elevation.elevation,
					"地域": ""//cityName.prefecture + cityName.city
				}));
				// ポップアップをマーカーに紐づけ
				marker.bindPopup(popup);
				// マーカーの座標をマウスの現在地にセット
				marker.setLatLng(event.latlng);
				marker.addTo(map).openPopup();
				// 配列に格納しておく
				this.markers.push(marker);
			}
		})
	}
	onButtonDisabled = (map: L.Map) => {
		// カーソルをもとに戻す
		map.getContainer().style.cursor = "";
		// マウスイベントの設定をもとに戻す
		map.off("contextmenu");
		// 描画したマーカーを削除する
		this.markers.forEach(marker => {
			map.removeLayer(marker);
		})
	}
}
