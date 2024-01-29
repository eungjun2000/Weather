import { useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls , Environment, Html } from "@react-three/drei"
import {Room} from "./components/Room";
import ThunderEffect from "./weatherEffects/ThunderEffect";
import RainEffect from "./weatherEffects/RainEffect";
import SnowEffect from "./weatherEffects/SnowEffect"
import axios from "axios";

const RoomArea = () => {
    const WEATHER_KEY = "b8dcea89580335ecec20d6f91d93bba1";
    const [roomBack, setRoomBack] = useState(null);
    const [weather, setWeather] = useState("");

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
            const curState = response.data.weather[0].id;
            if(curState >= 200 && curState < 300){setRoomBack("ThunderEffect"); setWeather("Thunder");
            }else if(curState >= 300 && curState < 600){setRoomBack("RainEffect"); setWeather("Rainy");
            }else if(curState >= 600 && curState < 700){setRoomBack("SnowEffect"); setWeather("Snowy");
            }else if(curState >= 700 && curState < 800){setRoomBack("Windy"); setWeather("Windy");
            }else if(curState === 800){setRoomBack("Sunny"); setWeather("Sunny");
            }else if(curState === 801){setRoomBack("SunnyCloud"); setWeather("Sunny and Cloudy");
            }else if(curState > 801 && curState < 900){setRoomBack("Cloudy"); setWeather("Cloudy");}

        }catch(e){
            console.log("Error fetching room area data : " + e);
        }
    }

    return(
        <Canvas
            style={{width: "100%", height: "97.7vh", borderRadius:"15px"}}
            camera={{fov:30, position: [7, 7, 7]}}>
            <OrbitControls
                enableZoom={false}
                minPolarAngle={Math.PI/4}
                maxPolarAngle={Math.PI/2}
            />  
            <Environment preset="sunset" background blur={0.5}/>
            <Room scale={0.9}/>
            <Html fullscreen>
                <div className="whatsTheWeatherToday">Hello, It's {weather} Today.</div>
                {roomBack === "ThunderEffect" && <ThunderEffect/>}
                {roomBack === "RainEffect" && <RainEffect/>}
                {roomBack === "SnowEffect" && <SnowEffect/>}
            </Html>
        </Canvas>
    )
}

export default RoomArea;