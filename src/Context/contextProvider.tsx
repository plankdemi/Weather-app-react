// MyProvider.tsx
import React, { useState, createContext } from "react";
import {
  whichDataToShowContext,
  dateContext,
  dateSelectedContext,
  markersContext,
} from "./context";

interface Props {
  children: React.ReactNode;
}

const ContextProvider: React.FC<Props> = ({ children }) => {
  const [showWeather, setShowWeather] = useState({
    weather: false,
    condition: false,
    visibility: false,
    wind: false,
    pressure: false,
    precipitation: false,
    humidity: false,
    cloudCover: false,
    uvIndex: false,
  });

  const [dateSelection, setDate] = useState({
    firstDate: new Date("1900-01-01"),
    secondDate: new Date("1900-01-01"),
  });

  const [dateSelected, setDateSelected] = useState({
    firstDateSelected: false,
    secondDateSelected: false,
  });

  const [coordinates, setMarkers] = useState<
    Array<{ lat: number; lng: number }>
  >([]);

  return (
    <markersContext.Provider value={{ coordinates, setMarkers }}>
      <dateSelectedContext.Provider value={{ dateSelected, setDateSelected }}>
        <whichDataToShowContext.Provider
          value={{ showWeather, setShowWeather }}
        >
          <dateContext.Provider value={{ dateSelection, setDate }}>
            {children}
          </dateContext.Provider>
        </whichDataToShowContext.Provider>
      </dateSelectedContext.Provider>
    </markersContext.Provider>
  );
};

export default ContextProvider;
