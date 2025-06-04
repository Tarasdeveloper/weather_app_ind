import { useState } from 'react';
import Search from '../Search/Search';
import { useEffect } from 'react';

export default function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(param) {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=e34b4c51d8c2b7bf48d5217fe52ff79e&units=metric`
            );
            const data = await response.json();
            if (response.ok) {
                setWeatherData(data);
                setLoading(false);
                setSearch('');
            } else {
                setWeatherData(null);
                setError('City not found, try again please');
            }
        } catch (e) {
            setWeatherData(null);
            setError('Some error occured. Please try again please');
            setLoading(false);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    function handleSearch() {
        fetchWeatherData(search);
        setSearch('');
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-uk', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        });
    }

    useEffect(() => {
        fetchWeatherData('odesa');
    }, []);

    console.log(weatherData);

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {error && <h3 className="error">{error}</h3>}

            {loading ? (
                <h1 className="loading"> Loading...</h1>
            ) : (
                <div>
                    <div className="cityName">
                        <h2>
                            {weatherData?.name}{' '}
                            <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">
                        {weatherData ? Math.round(weatherData.main.temp) : ''}
                        &deg;
                    </div>
                    <div className="description">
                        {weatherData?.weather?.[0]?.icon && (
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                alt={weatherData.weather[0].description}
                            />
                        )}
                        <p>{weatherData?.weather?.[0]?.description}</p>
                    </div>

                    <div className="weather-info">
                        <div className="column">
                            <div>
                                <p className="wind">
                                    {weatherData?.wind?.speed} <span>m/s</span>
                                </p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div className="column">
                            <div>
                                <p className="humidity">
                                    {weatherData?.main?.humidity} <span>%</span>
                                </p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
