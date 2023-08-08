import { createContext } from "react";

const whichDataToShowContext = createContext({
  showWeather: {
    weather: false,
    condition: false,
    visibility: false,
    wind: false,
    pressure: false,
    precipitation: false,
    humidity: false,
    cloudCover: false,
    uvIndex: false,
  },
  setShowWeather: (set: any) => {},
});

const dateContext = createContext({
  dateSelection: {
    firstDate: new Date("1900-01-01"),
    secondDate: new Date("1900-01-01"),
  },
  setDate: (set: any) => {},
});
const dateSelectedContext = createContext({
  dateSelected: {
    firstDateSelected: false,
    secondDateSelected: false,
  },
  setDateSelected: (set: any) => {},
});

const markersContext = createContext({
  coordinates: [{ lat: 54.8985, lng: 23.9036 }],

  setMarkers: (set: any) => {},
});



export {
  whichDataToShowContext,
  dateContext,
  dateSelectedContext,
  markersContext,
 
};
