import L from 'leaflet';
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
		return this.container;
	}
}