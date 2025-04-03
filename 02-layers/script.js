const singapore = [1.3521, 103.8198]; // coordinates for leaflet are lat, lng, and usually they are elements in array
const map = L.map('map');

// set the center point of the map
map.setView(singapore, 13);

// tile layer
// -- tiles: the squares that make up the map
// -- layer: anything visual on the map -- represents one thing
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);