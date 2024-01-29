import thunderCloud from "./images/thunderCloud.png"
import Rainy from "./images/Rainy.png"
import SnowFall from "./images/SnowFall.png"
import Sunny from "./images/Sunny.png"
import SunnyCloud from "./images/SunnyCloudy.png"
import Windy from "./images/Windy.png"
import Cloudy from "./images/Cloudy.png"

import React, {useEffect, useState} from "react";
import axios from "axios";

const WeatherCurrentPerTime = () => {
    const WEATHER_KEY = "b8dcea89580335ecec20d6f91d93bba1";
    const [perTime, setPerTime] = useState([]);
    const [weatherPerTimeList, setWeatherPerTimeList] = useState([]);
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            fetchWeatherCurrentPerTime(lat, lon);
        })
    }, [])

    const fetchWeatherCurrentPerTime = async(lat, lon) => {
        try{
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_KEY}&units=metric`
            );

            const tempList = [];
            const tempList_2 = [];
            const tempList_3 = [];
            
            for (let i = 0; i < 6; i++) {
                tempList.push(Math.floor(response.data.list[i].main.temp));

                const curState = response.data.list[i].weather[0].id
                if(curState >= 200 && curState < 300){tempList_2.push(thunderCloud);
                }else if(curState >= 300 && curState < 600){tempList_2.push(Rainy);
                }else if(curState >= 600 && curState < 700){tempList_2.push(SnowFall);
                }else if(curState >= 700 && curState < 800){tempList_2.push(Windy);
                }else if(curState === 800){tempList_2.push(Sunny);
                }else if(curState === 801){tempList_2.push(SunnyCloud);
                }else if(curState > 801 && curState < 900){tempList_2.push(Cloudy);}

                tempList_3.push(response.data.list[i].dt_txt.slice(11, 13));
            }

            for(let j = 0; j < tempList_3.length; j++){
                if(tempList_3[j] === "03"){tempList_3[j] = "3AM"}
                if(tempList_3[j] === "06"){tempList_3[j] = "6AM"}
                if(tempList_3[j] === "09"){tempList_3[j] = "9AM"}
                if(tempList_3[j] === "12"){tempList_3[j] = "12AM"}
                if(tempList_3[j] === "15"){tempList_3[j] = "3PM"}
                if(tempList_3[j] === "18"){tempList_3[j] = "6PM"}
                if(tempList_3[j] === "21"){tempList_3[j] = "9PM"}
                if(tempList_3[j] === "00"){tempList_3[j] = "Tomorrow";}
            }

            setWeatherPerTimeList(tempList);
            setWeather(tempList_2);
            setPerTime(tempList_3);
        }catch(e){
            console.log("Error fetching weather current time data : " + e);
        }
    }
    
    return(
        <div className='wrapper'>
            <div className="weatherCurTime">
            {weatherPerTimeList && (weatherPerTimeList.map((item, idx) => {
                return(
                <div key={idx} className="weatherCurTimeIcon">
                    <p className="perTime">{perTime[idx]}</p>
                    <img src={weather[idx]} className="weathercurrenttimeImage" alt="Load fail"/>
                    <p>{item}°</p>
                </div>
                );
            }))}
            </div>
        </div>
    )
}

export default WeatherCurrentPerTime;