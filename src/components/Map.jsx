import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import styles from './Map.module.css'
import { useCities } from '../contexts/CitiesContext';

export default function Map() {
    // useNavigate() hook for changing the location
    const navigate = useNavigate();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {cities} = useCities();

    // reading/writing search params with useSearchParams()
    // /app/cities/73930385?lat=38.727881642324164&lng=-9.140900099907554
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat'); 
    const lng = searchParams.get('lng');

    return (
        <div className={styles.mapContainer}>
            <MapContainer 
                center={mapPosition} 
                zoom={13} 
                scrollWheelZoom={true} 
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
               {cities.map(city => (    
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}