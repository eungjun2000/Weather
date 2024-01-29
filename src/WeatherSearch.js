import React, { useEffect } from 'react'

const WeatherSearch = () => {
    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
            center: new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3
        };
        var map = new window.kakao.maps.Map(container, options);
        var markerPosition  = new window.kakao.maps.LatLng(37.365264512305174, 127.10676860117488);
        var marker = new window.kakao.maps.Marker({position: markerPosition});
        marker.setMap(map);
    }, []);

    return (
        <div>
        	<div id="map" style={{width:"100%", height:"100%"}}></div> 
        </div>
    )
}

export default WeatherSearch;