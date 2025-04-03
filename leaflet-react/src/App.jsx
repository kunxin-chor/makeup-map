import "./App.css";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { useEffect, useRef, useState } from "react";

export default function App() {

  // A reference in React is a value that the component remembers, but when changed
  // won't cause render
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const [locations, setLocations] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const markerGroup = useRef(null);

  useEffect(() => {
    if (!leafletMap.current) {
      const singapore = [1.3521, 103.8198];

      // create the Leaflet map
      leafletMap.current = L.map(mapRef.current)
        .setView(singapore, 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(leafletMap.current);

      markerGroup.current = L.layerGroup();
      markerGroup.current.addTo(leafletMap.current);

      setTimeout(() => {
        leafletMap.current.invalidateSize();
      }, 1000);

      leafletMap.current.on('dblclick', function(event){
        const latLng = event.latlng;
        setLocations([...locations, {
          lat: latLng.lat,
          lng: latLng.lng
        }])
      })

    }

    // cleanup
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    }

  }, [])

  useEffect(()=>{
    if (markerGroup.current) {
      markerGroup.current.clearLayers();
      for (let location of locations) {
        const marker = L.marker([location.lat, location.lng]);
        marker.addTo(leafletMap.current);
      }
    }

  }, [locations])

  return (<>
   <input type="text" value={lat} onChange={(e)=>{
        setLat(e.target.value)
       }}/>
       <input type="text" value={lng} onChange={(e)=>{
        setLng(e.target.value)
       }}/>
       <button onClick={()=>{
         setLocations([...locations, {
          lat, lng
         }])
       }}>Add to Map</button> 
    <div id="map" ref={mapRef}>
      
    </div>
  </>)
}