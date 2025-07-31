import React, { useState, useEffect } from 'react';

const PrayerTimes = ({ timings, date, city, loading }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  // Calculate next prayer
  useEffect(() => {
    if (timings) {
      const now = new Date();
      const currentTimeStr = now.toTimeString().slice(0, 5);
      
      const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
      const nextPrayerInfo = prayerOrder.find(prayer => {
        const prayerTime = timings[prayer];
        return prayerTime > currentTimeStr;
      });
      
      setNextPrayer(nextPrayerInfo || 'Fajr'); // If no prayer is left today, next is Fajr tomorrow
    }
  }, [timings, currentTime]);

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white"></div>
            <p className="text-white/80 text-lg">Loading prayer times...</p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!timings || !date) {
    return (
      <div className="w-full max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 text-center">
          <div className="mb-6">
            <div className="bg-white/20 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Welcome to Prayer Times</h3>
          <p className="text-white/70 text-lg leading-relaxed max-w-md mx-auto">
            Please search for a Moroccan city above to view accurate prayer times and Islamic calendar information.
          </p>
        </div>
      </div>
    );
  }

  // Prayer times data with icons and Arabic names
  const prayerData = [
    {
      name: 'Fajr',
      arabic: 'الفجر',
      time: timings.Fajr,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/>
        </svg>
      ),
      description: 'Dawn Prayer',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      name: 'Sunrise',
      arabic: 'الشروق',
      time: timings.Sunrise,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      description: 'Sunrise',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      name: 'Dhuhr',
      arabic: 'الظهر',
      time: timings.Dhuhr,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z"/>
        </svg>
      ),
      description: 'Noon Prayer',
      gradient: 'from-amber-400 to-yellow-500'
    },
    {
      name: 'Asr',
      arabic: 'العصر',
      time: timings.Asr,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
      ),
      description: 'Afternoon Prayer',
      gradient: 'from-orange-400 to-red-500'
    },
    {
      name: 'Sunset',
      arabic: 'المغرب',
      time: timings.Sunset,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      description: 'Sunset',
      gradient: 'from-pink-400 to-red-500'
    },
    {
      name: 'Maghrib',
      arabic: 'المغرب',
      time: timings.Maghrib,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-3.87 0-7 3.13-7 7 0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7z"/>
        </svg>
      ),
      description: 'Evening Prayer',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      name: 'Isha',
      arabic: 'العشاء',
      time: timings.Isha,
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
      ),
      description: 'Night Prayer',
      gradient: 'from-indigo-600 to-purple-700'
    }
  ];

  // Filter out sunrise and sunset for main prayer times
  const mainPrayers = prayerData.filter(prayer => 
    !['Sunrise', 'Sunset'].includes(prayer.name)
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header with city and date info */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/20">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Prayer Times for {city}
          </h2>
          <p className="text-white/70 text-lg">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Date Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Gregorian Date */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <div className="bg-emerald-500/20 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Gregorian Date</h3>
                <p className="text-white/60 text-sm">International Calendar</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">{date.gregorian.date}</p>
              <p className="text-white/80 text-lg">
                {date.gregorian.month.en} {date.gregorian.year}
              </p>
            </div>
          </div>

          {/* Hijri Date */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <div className="flex items-center mb-4">
              <div className="bg-purple-500/20 rounded-full p-3 mr-4">
                <svg className="w-6 h-6 text-purple-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Hijri Date</h3>
                <p className="text-white/60 text-sm">Islamic Calendar</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">{date.hijri.date}</p>
              <p className="text-white/80 text-lg">
                {date.hijri.month.en} {date.hijri.year} AH
              </p>
            </div>
          </div>
        </div>

        {/* Next Prayer Indicator */}
        {nextPrayer && (
          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-emerald-400/30">
            <div className="flex items-center justify-center space-x-3">
              <div className="animate-pulse">
                <svg className="w-6 h-6 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <p className="text-emerald-100 font-medium">
                Next Prayer: <span className="font-bold">{nextPrayer}</span> at{' '}
                <span className="font-bold">{timings[nextPrayer]}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Prayer Times Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
        {mainPrayers.map((prayer, index) => (
          <div
            key={prayer.name}
            className={`
              relative group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20
              hover:bg-white/20 hover:border-white/30 hover:scale-105
              transition-all duration-300 ease-in-out cursor-pointer
              ${nextPrayer === prayer.name ? 'ring-2 ring-emerald-400/50 bg-emerald-500/10' : ''}
            `}
            style={{
              animationDelay: `${index * 150}ms`,
              animation: 'fadeInUp 0.6s ease-out both'
            }}
          >
            {/* Next prayer indicator */}
            {nextPrayer === prayer.name && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                  Next
                </div>
              </div>
            )}

            {/* Prayer icon with gradient */}
            <div className={`bg-gradient-to-r ${prayer.gradient} rounded-full p-4 w-16 h-16 mx-auto mb-4 text-white shadow-lg`}>
              {prayer.icon}
            </div>

            {/* Prayer details */}
            <div className="text-center">
              <h3 className="text-white font-bold text-xl mb-1">{prayer.name}</h3>
              <p className="text-white/60 text-sm mb-2">{prayer.arabic}</p>
              <p className="text-2xl font-bold text-white mb-2">{prayer.time}</p>
              <p className="text-white/50 text-xs">{prayer.description}</p>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sunrise/Sunset Times */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/>
            </svg>
            Sun Times
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Sunrise</span>
              <span className="text-white font-semibold">{timings.Sunrise}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/70">Sunset</span>
              <span className="text-white font-semibold">{timings.Sunset}</span>
            </div>
          </div>
        </div>

        {/* Current Time */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-white font-bold text-lg mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Current Time
          </h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">
              {currentTime.toLocaleTimeString('en-US', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
            <p className="text-white/60 text-sm">
              {currentTime.toLocaleDateString('en-US', { timeZoneName: 'short' })}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default PrayerTimes;