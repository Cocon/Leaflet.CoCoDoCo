# Leaflet.CocoDoco

**This is pre-release**

![Leaflet.CocoDoco 動作Demo](https://imgur.com/TcCuniQ.png)

クリックした地点の位置情報を表示することができる Leaflet.js プラグインです。  
Leaflet 地図上で右クリックをすると、その地点の大まかな住所とその土地の標高を知ることができます。  
住所を求めるのにはオープンソースかつ無料で利用できる逆ジオコーダー [geolonia/open-reverse-geocoder](https://github.com/geolonia/open-reverse-geocoder) を、
高度を求めるのには [国土地理院の API](http://maps.gsi.go.jp/development/elevation_s.html) を用いています。  
外部の API を使用していますので、過剰な負荷をかけるような使用はご遠慮ください。

## Usage

プラグインをインストールし、クラス`CocoDoco`を読み込んでください。
クラス`CocoDoco`のインスタンスを作成し、ご自身で作成された L.Map インスタンスに追加してあげると Leaflet 地図上にコントロールが追加されます。  
`CocoDoco`コンストラクタは次のような引数を取ります。コントロールを追加する位置を指定することができます。

```typescript
new CocoDoco({
	position: "topright" | "topleft" | "bottonleft" | "bottonright",
});
```

`CocoDoco`インスタンスを地図に追加するには他の Leaflet プラグインと同様に`addTo`メソッドを用います。
詳しい使い方は下記のコード例を参考にしてください。

### With npm (Recommended)

パッケージマネージャやビルドツールを用いる場合の使用例です。

```terminal
npm install -S @coconmap/leaflet.cocodoco
```

#### Sample code

```typescript
import L from "leaflet";
import { CocoDoco } from "@coconmap/leaflet.cocodoco";

const map = new L.map("my_map", {
	center: [35.4477712, 139.6425415],
	zoom: 13,
});
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
const cocodoco = new CocoDoco({
	position: "topleft",
});
cocodoco.addTo(map);
```

### From CDN

CDN からコードをダウンロードして使うことができます。ただ、その際 Leaflet.js の読み込みが先になるようにご注意ください(本ライブラリが Leaflet.js に依存しているため)。

```html
<script src="https://cdn.jsdelivr.net/npm/@coconmap/leaflet.cocodoco@latest/dist/bundle.js"></script>
```

#### Sample code

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<!-- まずLeaflet.jsに同梱のスタイルファイルを -->
		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.css"
		/>
		<!-- 次にLeaflet.js本体を -->
		<script src="https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/leaflet.js"></script>
		<!-- 本プラグインは最後に読み込んでください -->
		<script src="https://cdn.jsdelivr.net/npm/@coconmap/leaflet.cocodoco@latest/dist/bundle.js"></script>
	</head>

	<body>
		<div id="my_map" style="width: 500px; height: 500px;"></div>
		<script>
			const map = new L.map("my_map", {
				center: [35.4477712, 139.6425415],
				zoom: 13,
			});
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);
			const cocodoco = new CocoDoco({
				position: "topleft",
			});
			cocodoco.addTo(map);
		</script>
	</body>
</html>
```

## Author

ToriChan([@CoconMap](https://twitter.com/CoconMap))

ご不明点などあれば気軽にお声がけください！
