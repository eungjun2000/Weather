import WeatherCurrent from "./WeatherCurrent";
import WeatherCurrentPerTime from "./WeatherCurrentPerTime";
import WeatherForcast from "./WeatherForcast";
import WeatherSearch from "./WeatherSearch";

const WeatherArea = () => {    
    return(
        <div className="weatherarea">
            <div className="weathercurrent">
                <WeatherCurrent/>
            </div>
            <div className="weathercurrentList">
                <WeatherCurrentPerTime/>
            </div>
            <div className="weathersearchAndForcastList">
                <WeatherSearch/>
                <WeatherForcast/>
            </div>
        </div>
    )
}

export default WeatherArea;