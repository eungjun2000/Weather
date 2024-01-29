import './App.css';
import './index.css'
import RoomArea from './RoomArea';
import WeatherArea from './WeatherArea';

function App() {
  return (
    <div className='app' style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
      <div className='roomAreaGrid'>
        <RoomArea/>
      </div>
      <div>
        <WeatherArea/>
      </div>
    </div>
  );
}

export default App;