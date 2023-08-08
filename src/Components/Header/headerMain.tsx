import { whichDataToShowContext } from "../../Context/context";
import { useContext, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { dateContext } from "../../Context/context";
import { dateSelectedContext } from "../../Context/context";

export default function HeaderMain() {
  const { setShowWeather } = useContext(whichDataToShowContext);
  const { dateSelected, setDateSelected } = useContext(dateSelectedContext);
  const { dateSelection, setDate } = useContext(dateContext);

  function handleFirstDateChange(event: any) {
    setDateSelected({
      ...dateSelected,
      firstDateSelected: true,
    });
    const date = new Date(event["$d"]);
    setDate({
      ...dateSelection,
      firstDate: date,
    });
  }

  function handleSecondDateChange(event: any) {
    setDateSelected({
      ...dateSelected,
      secondDateSelected: true,
    });

    const date = new Date(event["$d"]);
    setDate({
      ...dateSelection,
      secondDate: date,
    });
  }

  function SetToggle(data: string) {
    setShowWeather((prevShowWeather: any) => ({
      ...prevShowWeather,
      [data]: !prevShowWeather[data],
    }));
  }
  const today = new Date();
  return (
    <div className="flex justify-between">
      <ul className="flex">
        <li className="m-4 p-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Your First Date"
                onChange={handleFirstDateChange}
                disableFuture
              />
            </DemoContainer>
          </LocalizationProvider>
        </li>
        {dateSelected.firstDateSelected && (
          <li className="m-4 p-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Your Second Date"
                  onChange={handleSecondDateChange}
                  disableFuture
                />
              </DemoContainer>
            </LocalizationProvider>
          </li>
        )}
      </ul>

      <ul className="flex">
        <button onClick={() => SetToggle("weather")}>
          <li className="m-4 p-4">Temperature</li>
        </button>
        <button onClick={() => SetToggle("condition")}>
          <li className="m-4 p-4">Condition</li>
        </button>
        <button onClick={() => SetToggle("visibility")}>
          <li className="m-4 p-4">Visibility</li>
        </button>
        <button onClick={() => SetToggle("wind")}>
          <li className="m-4 p-4">Wind</li>
        </button>
        <button onClick={() => SetToggle("pressure")}>
          <li className="m-4 p-4">Pressure</li>
        </button>
        <button onClick={() => SetToggle("precipitation")}>
          <li className="m-4 p-4">Precipitation</li>
        </button>
        <button onClick={() => SetToggle("humidity")}>
          <li className="m-4 p-4">Humidity</li>
        </button>
        <button onClick={() => SetToggle("cloudCover")}>
          <li className="m-4 p-4">Cloud Cover</li>
        </button>
        <button onClick={() => SetToggle("uvIndex")}>
          <li className="m-4 p-4">UV index</li>
        </button>
      </ul>
    </div>
  );
}
