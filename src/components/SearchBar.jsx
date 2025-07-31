import React, { useState, useRef, useEffect } from 'react';

const SearchBar = ({ onSearch, error, moroccanCities, loading }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setActiveSuggestion(-1);
    
    if (value.length > 0) {
      if (Array.isArray(moroccanCities)) {
        const filteredSuggestions = moroccanCities
          .filter(city =>
            city.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 8);
        setSuggestions(filteredSuggestions);
        setShowSuggestions(true);
      } else {
        console.error('moroccanCities is not an array:', typeof moroccanCities);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setInputValue(city);
    setShowSuggestions(false);
    setSuggestions([]);
    setActiveSuggestion(-1);
    onSearch(city);
  };

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue('');
      setShowSuggestions(false);
      setSuggestions([]);
      setActiveSuggestion(-1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        handleSuggestionClick(suggestions[activeSuggestion]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setActiveSuggestion(-1);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Container */}
      <div className="relative">
        <div className="relative group">
          {/* Search Input */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search for a Moroccan city... (e.g., Casablanca, Rabat)"
              disabled={loading}
              className={`
                w-full pl-12 pr-4 py-4 text-lg
                bg-white/10 backdrop-blur-md border-2 border-white/20
                rounded-2xl text-white placeholder-white/60
                focus:outline-none focus:border-white/40 focus:bg-white/20
                transition-all duration-300 ease-in-out
                group-hover:bg-white/15 group-hover:border-white/30
                disabled:opacity-50 disabled:cursor-not-allowed
                ${error ? 'border-red-400/60 focus:border-red-400' : ''}
                ${showSuggestions ? 'rounded-b-none' : ''}
              `}
            />
            
            {/* Search Icon */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Loading Spinner */}
            {loading && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white/30 border-t-white"></div>
              </div>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-2 border-t-0 border-white/20 rounded-b-2xl shadow-2xl max-h-64 overflow-y-auto"
            >
              {suggestions.map((city, index) => (
                <div
                  key={index}
                  className={`
                    px-4 py-3 cursor-pointer transition-all duration-200
                    border-b border-white/10 last:border-b-0
                    ${activeSuggestion === index 
                      ? 'bg-indigo-500/20 text-indigo-900' 
                      : 'text-gray-800 hover:bg-white/50'
                    }
                  `}
                  onClick={() => handleSuggestionClick(city)}
                  onMouseEnter={() => setActiveSuggestion(index)}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{city}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleSearch}
            disabled={loading || !inputValue.trim()}
            className="
              group relative px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600
              text-white font-semibold rounded-xl shadow-lg
              hover:from-emerald-400 hover:to-teal-500 hover:shadow-xl
              focus:outline-none focus:ring-4 focus:ring-emerald-300/50
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg
              transform transition-all duration-300 ease-in-out
              hover:scale-105 active:scale-95
            "
          >
            <span className="flex items-center space-x-2">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Find Prayer Times</span>
                </>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-xl">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 className="text-red-200 font-semibold mb-1">City Not Found</h4>
              <p className="text-red-100 text-sm leading-relaxed">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Suggestions */}
      {!inputValue && !error && (
        <div className="mt-6">
          <p className="text-white/60 text-sm mb-3 text-center">Popular cities:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Agadir', 'Tanger'].map((city) => (
              <button
                key={city}
                onClick={() => handleSuggestionClick(city)}
                disabled={loading}
                className="
                  px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20
                  text-white/80 text-sm rounded-full
                  hover:bg-white/20 hover:border-white/30 hover:text-white
                  focus:outline-none focus:ring-2 focus:ring-white/30
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 ease-in-out
                  transform hover:scale-105
                "
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;