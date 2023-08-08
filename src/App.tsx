import "./App.css";
import HeaderMain from "./Components/Header/headerMain";
import Weather from "./Components/Main/Weather/weather";
import Maps from "./Components/Main/Map/map";
import { useContext } from "react";
import { markersContext } from "./Context/context";

function App() {
  const { coordinates } = useContext(markersContext);
  return (
    <div className="App">
      <HeaderMain></HeaderMain>
      <div className="flex">
        {coordinates.length > 0 &&
          coordinates.map((coordinate) => (
            <Weather marker={coordinate}></Weather>
          ))}
        <Maps></Maps>
      </div>
    </div>
  );
}

export default App;
