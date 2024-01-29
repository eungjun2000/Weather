import thunderCloud from "./images/thunderCloud.png"
import thunderCloud_back from "./images/Back_thunder.webp"
import Rainy from "./images/Rainy.png"
import Rainy_back from "./images/Back_rainy.jpg"
import SnowFall from "./images/SnowFall.png"
import SnowFall_back from "./images/Back_snowy.jpg"
import Sunny from "./images/Sunny.png"
import SunnyCloud from "./images/SunnyCloudy.png"
import Sunny_back from "./images/Back_sunny.jpg"
import Windy from "./images/Windy.png"
import Windy_back from "./images/Back_Windy.webp"
import Cloudy from "./images/Cloudy.png"
import Cloudy_back from "./images/Back_cloudy.jpg"

import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import WaterDropRoundedIcon from '@mui/icons-material/WaterDropRounded';
import AirRoundedIcon from '@mui/icons-material/AirRounded';
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';
import CompressRoundedIcon from '@mui/icons-material/CompressRounded';

import React, {useEffect, useState} from "react";
import axios from "axios";

const WeatherCurrent = () => {
    const WEATHER_KEY = "b8dcea89580335ecec20d6f91d93bba1";
    const [weather, setWeather] = useState(null);
    const [icon, setIcon] = useState();
    const [back, setBack] = useState();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    var monthToStr = "";
    switch(month){
        case 1: monthToStr = "January"; break;
        case 2: monthToStr = "February"; break;
        case 3: monthToStr = "March"; break;
        case 4: monthToStr = "April"; break;
        case 5: monthToStr = "May"; break;
        case 6: monthToStr = "June"; break;
        case 7: monthToStr = "July"; break;
        case 8: monthToStr = "August"; break;
        case 9: monthToStr = "September"; break;
        case 10: monthToStr = "October"; break;
        case 11: monthToStr = "November"; break;
        case 12: monthToStr = "December"; break;
    }

    const formattedDate = monthToStr + " " + `${day} ${year}`;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            fetchWeatherCurrent(lat, lon);
        })
    }, [])

    const fetchWeatherCurrent = async (lat, lon) => {
        try{
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
            );

            const temp = Math.round(response.data.main.temp);
            const temp_min = Math.round(response.data.main.temp_min);
            const temp_max = Math.round(response.data.main.temp_max);
            const humid = response.data.main.humidity;
            const wind = response.data.wind.speed;
            const feels_like = response.data.main.feels_like;
            const pressure = response.data.main.pressure;
            
            const curState = response.data.weather[0].id;
            if(curState >= 200 && curState < 300){setIcon(thunderCloud);setBack(thunderCloud_back);
            }else if(curState >= 300 && curState < 600){setIcon(Rainy);setBack(Rainy_back);
            }else if(curState >= 600 && curState < 700){setIcon(SnowFall);setBack(SnowFall_back)
            }else if(curState >= 700 && curState < 800){setIcon(Windy);
            }else if(curState === 800){setIcon(Sunny);setBack(Sunny_back);
            }else if(curState === 801){setIcon(SunnyCloud);setBack(Sunny_back);
            }else if(curState > 801 && curState < 900){setIcon(Cloudy);setBack(Cloudy_back);}

            setWeather({
                name: response.data.name,
                temp: temp,
                temp_min: temp_min,
                temp_max: temp_max,
                humid: humid,
                wind: wind,
                feels_like: feels_like,
                pressure: pressure
            })

        }catch(e){
            console.log("Error fetching weather current data : " + e);
        }
    }

    return(
        <div className='wrapper'>
            {weather && (
            <div className="weatherCurInform" style={{background: `url(${back}) center/cover`}}>
                <div className="weatherCurLocDate">
                    <LocationOnRoundedIcon className="loactionOnRoundedIcon" color="error"/>&ensp;{weather.name}
                    <p>{formattedDate}</p>
                    <div className="weatherCurIcon">
                        <img src={icon} className="weathercurrentImage" alt="road fail"/>
                    </div>
                </div>
                <div className="weatherCurTemp">
                    <p className="temp">{weather.temp}°</p>
                    <p className="temp_minmax">{weather.temp_min}° / {weather.temp_max}°</p>
                </div>
                <div className="weatherCurAdditional">
                    <div className="humid">
                        <div><WaterDropRoundedIcon color="action"/></div>
                        Humidity
                        <hr/>
                        <div className="curAddFont">{weather.humid}%</div>
                    </div>
                    <div className="wind">
                        <div><AirRoundedIcon color="action"/></div>
                        Wind
                        <hr/>
                        <div className="curAddFont">{weather.wind}m/s</div>
                    </div>
                    <div className="feelsLike">
                        <div><ThermostatRoundedIcon color="action"/></div>
                        Real Feel
                        <hr/>
                        <div className="curAddFont">{weather.feels_like}°</div>
                    </div>
                    <div className="pressure">
                        <div><CompressRoundedIcon color="action"/></div>
                        Pressure
                        <hr/>
                        <div className="curAddFont">{weather.pressure}</div>
                    </div>
                </div>          
            </div>
            )}
        </div>
    )
}

export default WeatherCurrent;