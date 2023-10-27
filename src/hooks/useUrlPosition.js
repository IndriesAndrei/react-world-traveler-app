import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
    // reading/writing search params with useSearchParams()
    // /app/cities/73930385?lat=38.727881642324164&lng=-9.140900099907554
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get('lat'); 
    const lng = searchParams.get('lng');

    return [lat, lng];
}