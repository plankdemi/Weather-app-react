import { useState, useEffect, useContext } from "react";
import { dateContext } from "../../../Context/context";
import { dateSelectedContext } from "../../../Context/context";
import { format } from "date-fns"; // Import the date-fns format function

import ShowWeather from "./showWeather";

export default function Weather(props: any) {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const { dateSelection } = useContext(dateContext);
  const { dateSelected } = useContext(dateSelectedContext);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  console.log("Arived");
  useEffect(() => {
    if (dateSelected.firstDateSelected && dateSelected.secondDateSelected) {
      const startDate = format(dateSelection.firstDate, "yyyy-MM-dd");
      const endDate = new Date(dateSelection.secondDate);
      endDate.setDate(endDate.getDate() + 1);

      const incrementingDate = new Date(startDate);

      setWeatherData([]);

      while (incrementingDate <= endDate) {
        const formattedDate = format(incrementingDate, "yyyy-MM-dd");
        fetch(
          `https://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${props.marker.lat},${props.marker.lng}&dt=${formattedDate}`
        )
          .then((response) => response.json())
          .then((data) => {
            setWeatherData((prevWeatherData) => [...prevWeatherData, data]);
          })
          .catch((error) =>
            console.error("Error fetching weather data:", error)
          );

        incrementingDate.setDate(incrementingDate.getDate() + 1);
      }
    }
  }, [
    dateSelected.firstDateSelected,
    dateSelected.secondDateSelected,
    apiKey,
    dateSelection,
    props.marker,
  ]);
  return (
    <div className="w-1/8">
      {weatherData.length > 0 &&
        weatherData.map((data, index) => (
          <ShowWeather key={index} data={data} className="flex-auto" />
        ))}
    </div>
  );
}
