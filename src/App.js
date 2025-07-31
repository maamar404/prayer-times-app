import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import PrayerTimes from './components/PrayerTimes';
import { MOROCCAN_CITIES } from './data/Cities';

function App() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [date, setDate] = useState(null);
  const [city, setCity] = useState('');
  const [key, setKey] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isValidMoroccanCity = (cityName) => {
    if (!Array.isArray(MOROCCAN_CITIES)) {
      console.error('MOROCCAN_CITIES is not an array');
      return false;
    }
    return MOROCCAN_CITIES.some(city => 
      city.toLowerCase() === cityName.toLowerCase()
    );
  };

  const fetchPrayerTimes = async (cityName) => {
    setError('');
    setLoading(true);

    // Validate if it's a Moroccan city
    if (!isValidMoroccanCity(cityName)) {
      setError(`"${cityName}" is not a valid Moroccan city. Please enter a valid city name from Morocco.`);
      setPrayerTimes(null);
      setDate(null);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(cityName)}&country=Morocco&method=2`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch prayer times');
      }
      
      const data = await response.json();
      
      if (data.code === 200 && data.data) {
        setPrayerTimes(data.data.timings);
        setDate(data.data.date);
        setCity(cityName);
        setKey(Date.now());
      } else {
        throw new Error('Invalid response from prayer times API');
      }
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      setError(`Unable to fetch prayer times for "${cityName}". Please try again later.`);
      setPrayerTimes(null);
      setDate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Islamic pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zM10 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center py-8 md:py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 mr-4">
                <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13H10v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
                  أوقات الصلاة
                </h1>
                <p className="text-xl md:text-2xl text-white/90 font-light">Prayer Times Morocco</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Find accurate prayer times for all Moroccan cities. Stay connected with your faith wherever you are.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-6xl mx-auto">
            <SearchBar 
              onSearch={fetchPrayerTimes} 
              error={error} 
              moroccanCities={MOROCCAN_CITIES}
              loading={loading}
            />
            
            <div className="mt-8">
              <PrayerTimes 
                key={key} 
                timings={prayerTimes} 
                date={date} 
                city={city}
                loading={loading}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto">
            <p className="text-white/60 text-sm md:text-base">
              © 2024 Prayer Times Morocco • Made with ❤️ for the Muslim Community
            </p>
            <p className="text-white/40 text-xs mt-2">
              Data provided by Al-Adhan API • Islamic Society of North America calculation method
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;