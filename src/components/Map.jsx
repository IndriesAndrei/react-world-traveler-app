import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

export default function Map() {
    // useNavigate() hook for changing the location
    const navigate = useNavigate();

    // reading/writing search params with useSearchParams()
    // /app/cities/73930385?lat=38.727881642324164&lng=-9.140900099907554
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat'); 
    const lng = searchParams.get('lng');

    return (
        <div className={styles.mapContainer} onClick={() => {navigate('form')}}>
            <h1>Map</h1>
            <h2>Position: {lat}, {lng}</h2>
      <button onClick={() => setSearchParams({lat: 23, lng: 50})}>Change position</button>

        </div>
    )
}