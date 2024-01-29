import thunderCloud from "./images/thunderCloud.png"
import Rainy from "./images/Rainy.png"
import SnowFall from "./images/SnowFall.png"
import Sunny from "./images/Sunny.png"
import SunnyCloud from "./images/SunnyCloudy.png"
import Windy from "./images/Windy.png"
import Cloudy from "./images/Cloudy.png"

import React, {useEffect, useState} from "react";
import axios from "axios";

const WeatherForcast = () => {
    const WEATHER_KEY = "b8dcea89580335ecec20d6f91d93bba1";
    const [weather, setWeather] = useState([]);
    const [whatDay, setWhatDay] = useState([])
    const [icon, setIcon] = useState();

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            fetchWeatherForcast(lat, lon);
        })
    }, [])

    const fetchWeatherForcast = async(lat, lon) => {
        try{
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
            );

            //console.log(response.data.list)

            var dateDict = {};
            const dateArr = [];
            for(let i = 0; i < response.data.list.length; i++){
                if(response.data.list[i].dt_txt.slice(11, 16) === "21:00" && response.data.list[i].dt_txt.slice(0, 10) !== formattedDate){
                    dateDict["date"] = response.data.list[i].dt_txt.slice(0, 10);
                    dateDict["id"] = response.data.list[i].weather[0].id;
                    dateDict["min_temp"] = Math.round(response.data.list[i].main.temp_min);
                    dateDict["max_temp"] = Math.round(response.data.list[i].main.temp_max);
                    dateArr.push(dateDict);
                    dateDict = {};
                }
            }

            const tempList = [];
            for(let j = 0; j < dateArr.length; j++){
                if(dateArr[j].id >= 200 && dateArr[j].id < 300){tempList.push(thunderCloud);
                }else if(dateArr[j].id >= 300 && dateArr[j].id < 600){tempList.push(Rainy);
                }else if(dateArr[j].id >= 600 && dateArr[j].id < 700){tempList.push(SnowFall);
                }else if(dateArr[j].id >= 700 && dateArr[j].id < 800){tempList.push(Windy);
                }else if(dateArr[j].id === 800){tempList.push(Sunny);
                }else if(dateArr[j].id === 801){tempList.push(SunnyCloud);
                }else if(dateArr[j].id > 801 && dateArr[j].id < 900){tempList.push(Cloudy);}
            }
            setIcon(tempList);
            setWeather(dateArr);
            getDayOfWeek(dateArr);

        }catch(e){
            console.log("Error fetching weather forcast data : " + e);
        }
    }
    
    const getDayOfWeek = (dateArr) => {
        const tempList_2 = [];
        const daysOfWeek = ["SUN", "MON", "TUE", 'WED', 'THU', 'FRI', 'SAT'];

        for(let k = 0; k < dateArr.length; k++){
            const parts = dateArr[k].date.split("-");
            const year = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const day = parseInt(parts[2], 10);
            const inputDate = new Date(year, month, day);
            const dayOfWeek = daysOfWeek[inputDate.getDay()];
            tempList_2.push(dayOfWeek);
        }
        setWhatDay(tempList_2);
    }

    /*
        {icon && (icon.map((item, idx) => {
            return(
                <div key={idx} className="weatherForcastIcon">
                    <img src={item} className="weatherforcastImage" alt="Load Fail"/>
                </div>
            )
        }))}
    */

    return(
        <div className='wrapper'>
            {icon && (
            <div className="weatherForcastInform">
                <span className="weatherForcastDate">
                    <div>{whatDay[0]}</div>
                    <div>{weather[0].date.slice(5, 10)}</div>
                </span>
                <span className="weatherForcastIcon">
                    <img src={icon[0]} className="weatherforcastImage" alt="Load Fail"/>
                </span>
                <span className="weatherForcastTemp">
                    {weather[0].min_temp}° / {weather[0].max_temp}°
                </span>

                <span className="weatherForcastDate">
                    <div>{whatDay[1]}</div>
                    <div>{weather[1].date.slice(5, 10)}</div>
                </span>
                <span className="weatherForcastIcon">
                    <img src={icon[1]} className="weatherforcastImage" alt="Load Fail"/>
                </span>
                <span className="weatherForcastTemp">
                    {weather[1].min_temp}° / {weather[1].max_temp}°
                </span>

                <span className="weatherForcastDate">
                    <div>{whatDay[2]}</div>
                    <div>{weather[2].date.slice(5, 10)}</div>
                </span>
                <span className="weatherForcastIcon">
                    <img src={icon[2]} className="weatherforcastImage" alt="Load Fail"/>
                </span>
                <span className="weatherForcastTemp">
                    {weather[2].min_temp}° / {weather[2].max_temp}°
                </span>

                <span className="weatherForcastDate">
                    <div>{whatDay[3]}</div>
                    <div>{weather[3].date.slice(5, 10)}</div>
                </span>
                <span className="weatherForcastIcon">
                    <img src={icon[3]} className="weatherforcastImage" alt="Load Fail"/>
                </span>
                <span className="weatherForcastTemp">
                    {weather[3].min_temp}° / {weather[3].max_temp}°
                </span>
            </div>
            )}
        </div>
    )
}

export default WeatherForcast;