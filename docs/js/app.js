
//正射影像
const Orthophoto = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: " <a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>"
});
//正射影像_混合
const Orthophoto_mix = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/PHOTO_MIX/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: " <a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>"
});
// google satellite
const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//臺灣通用電子地圖
const EMAP = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: "<a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>"
});


//OSM
const o_std = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

//縣市界
const CITY = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/CITY/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: "<a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>"
});

//鄉鎮區界
const TOWN = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/TOWN/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: "<a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>"
});

//村里界(108年10月)
const Village201910 = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/Village201910/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: "<a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>"
});

//Shadw20 
const S_20 = new L.tileLayer('https://landslide.geologycloud.tw/jlwmts/jetlink/Shadw20/GoogleMapsCompatible/{z}/{x}/{y}', {
    attribution: "<a href='https://landslide.geologycloud.tw/swagger/api-docs/api' target='_blank'>山崩雲</a>",
});

//1904-日治臺灣堡圖(明治版)-1:20,000
const JM20K_1904 = new L.tileLayer('https://gis.sinica.edu.tw/tileserver/file-exists.php?img=JM20K_1904-jpg-{z}-{x}-{y}', {
    attribution: "<a href='http://gissrv4.sinica.edu.tw/gis/twhgis/' target='_blank'>中央研究院</a>",
});

//陰影圖
const MOI_HILLSHADE = new L.tileLayer("https://wmts.nlsc.gov.tw/wmts/MOI_HILLSHADE/default/GoogleMapsCompatible/{z}/{y}/{x}", {
    attribution: "<a href='https://maps.nlsc.gov.tw/' target='_blank'>國土測繪中心</a>",
});

//五萬分之一地質圖
const Geology_50000 = new L.tileLayer("https://landslide.geologycloud.tw/jlwmts/jetlink/gm50000/GoogleMapsCompatible/{z}/{x}/{y}", {
    attribution: "<a href='https://landslide.geologycloud.tw/swagger/api-docs/api' target='_blank'>山崩雲</a>",
});

//山崩地滑敏感區
const SensitiveArea = new L.tileLayer("https://landslide.geologycloud.tw/jlwmts/jetlink/SensitiveArea/GoogleMapsCompatible/{z}/{x}/{y}.png", {
    attribution: "<a href='https://landslide.geologycloud.tw/swagger/api-docs/api' target='_blank'>山崩雲</a>",
});

//順向坡
const Dislope = new L.tileLayer("https://landslide.geologycloud.tw/jlwmts/jetlink/Dislope/GoogleMapsCompatible/{z}/{x}/{y}.png", {
    attribution: "<a href='https://landslide.geologycloud.tw/swagger/api-docs/api' target='_blank'>山崩雲</a>"
});
//MAP
const map = L.map('map', {
    center: [23.7, 121],
    zoom: 7,
    zoomControl: false, //false -> remove default zoom control
    layers: [Orthophoto]
});





//OpacityControl
L.control.opacity(
    overlaysTree,
    {
    label: "Layers"+ "</br>"+"Opacity",
    collapsed: true
    }
).addTo(map);

//add Scale
L.control.scale({
    metric: true,
    imperial: false,
    position: 'bottomleft'
}).addTo(map);

// add Geocoder
L.Control.geocoder({
    position: 'topleft',
    collapsed: false,
    placeholder: 'Search...',
    defaultMarkGeocode: true
      }).addTo(map);   

// moving zoom control to bottomright
L.control.zoom({
    position: 'bottomright'
    }).addTo(map);

// add geojson
axios.get("https://www.geologycloud.tw/api/v1/zh-tw/Fault50?t=.json")
        .then(function(result) {
            L.geoJSON(result.data, {
                onEachFeature: onEachFeature,
                style: {
                    weight: 1,
                    opacity: 1,
                    color: '#035BB2',
                    fillColor: '#035BB2',
                    fillOpacity: 0.5
                }
            }).addTo(map)
        }).catch(function(error) {
            console.log(error);
        });

    function onEachFeature(feature, layer) {
        var pro = feature.properties;
        var HTML = '';
        for (var q in pro) {
            HTML += q + ":" + pro[q] + '<br />';
        }
        layer.bindPopup(HTML);
    }
      
//  measurement control button
 L.control.measure({
    //  control position
    position: 'topleft',
    //  weather to use keyboard control for this plugin
    keyboard: true,
    //  shortcut to activate measure
    activeKeyCode: 'M'.charCodeAt(0),
    //  shortcut to cancel measure, defaults to 'Esc'
    cancelKeyCode: 27,
    //  line color
    lineColor: 'red',
    //  line weight
    lineWeight: 2,
    //  line dash
    lineDashArray: '6, 6',
    //  line opacity
    lineOpacity: 1,
    //  distance formatter
    // formatDistance: function (val) {
    //   return Math.round(1000 * val / 1609.344) / 1000 + 'mile';
    // }
  }).addTo(map);

//leaflet-locate control
  L.control.locate().addTo(map);

// Fullscreen
map.addControl(new L.Control.Fullscreen());

// Control.Layers.Tree baselayer
const baseTree = [
    {   
        label: '<div style="color: #FF0000;">底圖(測試中)</div>',
        children: [
            {label: '正射影像', layer: Orthophoto},
            {label: '正射影像_混合', layer: MOI_HILLSHADE},
            {label: '通用電子地圖', layer: EMAP},
            {label: 'OSM', layer: o_std},

        ]
    },
    
];

// Control.Layers.Tree overlayer
const overlaysTree = {
    label: '<div style="color: #FF0000;">疊圖(測試中)</div>',
    children: [
        {label: '人', children: [
            {label: 'Lyon', layer: L.marker([45.728, 4.945])},
            {label: 'Paris', layer: L.marker([48.725, 2.359])},
            {label: 'Toulouse', layer: L.marker([43.629, 1.364])},
        ]},
        {label: '經', children: [
            {label: 'Berlin', layer: L.marker([52.559, 13.287])},
            {label: 'Cologne', layer: L.marker([50.866, 7.143])},
            {label: 'Hamburg', layer: L.marker([53.630, 9.988])},
            {label: 'Munich', layer: L.marker([48.354, 11.786])},
        ]},
        {label: '交',children: [
            {label: 'Berlin', layer: L.marker([52.559, 13.287])},
            {label: 'Cologne', layer: L.marker([50.866, 7.143])},
            {label: 'Hamburg', layer: L.marker([53.630, 9.988])},
            {label: 'Munich', layer: L.marker([48.354, 11.786])},
        ]},
        {label: '聚',children: [
            {label: '1904台灣堡圖(明治)', layer: JM20K_1904},
            {label: 'Cologne', layer: L.marker([50.866, 7.143])},
            {label: 'Hamburg', layer: L.marker([53.630, 9.988])},
            {label: 'Munich', layer: L.marker([48.354, 11.786])},
        ]},        
        {label: '政',children:[
            {label: '縣市界', layer: CITY},
            {label: '鄉鎮區界', layer: TOWN},
            {label: '村里界（108年10月)', layer: Village201910},
            {label: 'Munich', layer: L.marker([48.354, 11.786])},
        ]},
        {label: '形質',children:[
            {label: 'Shadow_20m', layer: S_20},
            {label: '20公尺陰影圖', layer: MOI_HILLSHADE},
            {label: '五萬分之一地質圖', layer: Geology_50000},
            {label: '山崩地滑敏感區', layer: SensitiveArea},
            {label: '順向坡', layer: Dislope},
        ]},
        {label: '候',children:[
            {label: 'Berlin', layer: L.marker([52.559, 13.287])},
            {label: 'Cologne', layer: L.marker([50.866, 7.143])},
            {label: 'Hamburg', layer: L.marker([53.630, 9.988])},
            {label: 'Munich', layer: L.marker([48.354, 11.786])},
        ]},
        {label: '水',children:[
            {label: 'Berlin', layer: L.marker([52.559, 13.287])},
            {label: 'Cologne', layer: L.marker([50.866, 7.143])},
            {label: 'Hamburg', layer: L.marker([53.630, 9.988])},
            {label: 'Munich', layer: L.marker([48.354, 11.786])},
        ]},
        {label: '土',children:[
            {label: 'Berlin', layer: L.marker([52.559, 13.287])},
            {label: 'Cologne', layer: L.marker([50.866, 7.143])},
            {label: 'Hamburg', layer: L.marker([53.630, 9.988])},
            {label: 'Munich', layer: L.marker([48.354, 11.786])},
        ]},
        {label: '生',children:[
            {label: 'Berlin', layer: L.marker([52.559, 13.287])},
            {label: 'Cologne', layer: L.marker([50.866, 7.143])},
            {label: 'Hamburg', layer: L.marker([53.630, 9.988])},
            {label: 'Munich', layer: L.marker([48.354, 11.786])},
        ]},
            
        
    ]
}



// Control.Layers.Tree layer control
L.control.layers.tree(baseTree, overlaysTree,
    {namedToggle: false,
    selectorBack: false,
    collapseAll: 'Collapse all',
    expandAll: 'Expand all',
    collapsed: true,}).addTo(map);




