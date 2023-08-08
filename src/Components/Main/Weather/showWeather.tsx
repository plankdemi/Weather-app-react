"use client";

import { whichDataToShowContext } from "../../../Context/context";
import { useContext, useEffect, useState } from "react";
import { dateContext } from "../../../Context/context";


export default function ShowWeather(props: any) {
  const day = props.data.forecast.forecastday[0].hour;
  const { showWeather } = useContext(whichDataToShowContext);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const { dateSelection } = useContext(dateContext);


  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex(
        (prevVisibleIndex) => (prevVisibleIndex + 1) % day.length
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount to avoid memory leaks
  }, [day.length]);

  //a div, slider starts at 0th hour and slowly slides across hours while showing data
  console.log(day);
  console.log(props.data.location);
  return (
    <div className="w-full">
      <ul className="flex">
        {day.map((hourData: any, index: any) => (
          <li
            key={hourData.time}
            style={{
              display: index === visibleIndex ? "inline-block" : "none",
            }}
            className="bg-slate-400 m-4 w-full "
          >
            <h2>
              Weather for {props.data.location.name},{" "}
              {props.data.location.country}
            </h2>
            <p>{hourData.time}</p>
            {showWeather.weather && (
              <div>
                <p>
                  Temperature: {hourData.temp_c}°C ({hourData.temp_f}°F)
                </p>
                <p>
                  Feels Like: {hourData.feelslike_c}°C ({hourData.feelslike_f}
                  °F)
                </p>
              </div>
            )}
            {showWeather.condition && (
              <div>
                <p>Condition: {hourData.condition.text}</p>
                <img
                  src={hourData.condition.icon}
                  alt={hourData.condition.text}
                />
              </div>
            )}
            {showWeather.visibility && (
              <div>
                <p>
                  Visibility: {hourData.vis_km} km ({hourData.vis_miles} miles)
                </p>
              </div>
            )}
            {showWeather.wind && (
              <div>
                <p>
                  Wind Speed: {hourData.wind_kph} km/h ({hourData.wind_mph} mph)
                </p>
                <p>
                  Wind Direction: {hourData.wind_dir} ({hourData.wind_degree}°)
                </p>
                <p>
                  Wind Gust: {hourData.gust_kph} km/h ({hourData.gust_mph} mph)
                </p>
              </div>
            )}
            {showWeather.pressure && (
              <div>
                <p>
                  Pressure: {hourData.pressure_mb} mb ({hourData.pressure_in}{" "}
                  in)
                </p>
              </div>
            )}
            {showWeather.precipitation && (
              <div>
                <p>
                  Precipitation: {hourData.precip_mm} mm ({hourData.precip_in}{" "}
                  in)
                </p>
              </div>
            )}
            {showWeather.humidity && (
              <div>
                <p>Humidity: {hourData.humidity}%</p>
              </div>
            )}
            {showWeather.cloudCover && (
              <div>
                <p>Cloud Cover: {hourData.cloud}%</p>
              </div>
            )}
            {showWeather.uvIndex && (
              <div>
                <p>UV Index: {hourData.uv}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
