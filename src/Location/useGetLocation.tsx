import axios from "axios";
import { useState } from "react";
let secret = "bdc_ca223362ef49489fabadba3582b826ce";

interface locationInterface {
  latitude: number;
  longitude: number;
}
export function useGetLocation() {
  const [geolocation, setgeolocation] = useState<locationInterface>({
    latitude: 0,
    longitude: 0,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  function showPosition(position: any) {
    let x = position.coords.latitude + "" + position.coords.longitude;
    setgeolocation((prevState) =>{
      return {
        ...prevState,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
    });
  }

  return {
    geolocation,
  };
}
