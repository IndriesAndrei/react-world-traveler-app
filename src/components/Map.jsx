import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button'
import styles from './Map.module.css'

export default function Map() {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {cities} = useCities();
    const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();

    // reading/writing search params with useSearchParams()
    // /app/cities/73930385?lat=38.727881642324164&lng=-9.140900099907554
    const [searchParams, setSearchParams] = useSearchParams();
    const mapLat = searchParams.get('lat'); 
    const mapLng = searchParams.get('lng');

    useEffect(function() {
       if(mapLat && mapLng) setMapPosition([mapLat, mapLng])
    }, [mapLat, mapLng]);

    useEffect(function() {
        if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }, [geolocationPosition])

    return (
        <div className={styles.mapContainer}>
           {!geolocationPosition && (<Button type='position' onClick={getPosition}>
                {isLoadingPosition ? 'Loading...' : 'Use your position'}
            </Button>)}
            
            <MapContainer 
                center={mapPosition} 
                zoom={8} 
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

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}

// custom component 
function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);

    return null;
}

// custom component
function DetectClick() {
    // useNavigate() hook for changing the location
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            console.log(e); //ex:  latlng: LatLng {lat: 41.45919537950706, lng: 0.3900146484375}
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    });
}