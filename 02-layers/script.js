const singapore = [1.3521, 103.8198]; // coordinates for leaflet are lat, lng, and usually they are elements in array
const map = L.map('map', {
    doubleClickZoom: false
});

// set the center point of the map
map.setView(singapore, 13);

// tile layer
// -- tiles: the squares that make up the map
// -- layer: anything visual on the map -- represents one thing
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Add a marker to our map
const bugisMarker = L.marker([1.2994, 103.8555]);
bugisMarker.addTo(map);

bugisMarker.bindPopup(`<h1>Bugis</h1>
    <img style="width:240px" src="https://upload.wikimedia.org/wikipedia/commons/8/83/Raffles_Hospital_in_Bugis%2C_Singapore.jpg"/>
    `);

const somersetMarker = L.marker([1.3010, 103.8386]).addTo(map);
somersetMarker.addEventListener("click", function(){
    alert("Somerset clicked");
})

map.on('dblclick', function(event){
    // event contains all the details and parameters about the event
    const latLng = event.latlng;
    const newMarker = L.marker([latLng.lat, latLng.lng]);
    newMarker.addTo(map);
})

L.circle([1.3294,103.8021], {
    color: 'red',
    fillColor: "orange",
    radius: 500 // unit of measurement in meter
}).addTo(map);