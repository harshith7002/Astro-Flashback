
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Star, Moon, Sun } from 'lucide-react';

const AstroEventCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewMode, setViewMode] = useState('month'); // 'month' or 'events'

  // Astronomical events for 2025
  const astroEvents = {
    // January 2025
    '2025-01-03': {
      title: 'Quadrantids Meteor Shower Peak',
      type: 'meteor',
      description: 'One of the best meteor showers of the year with up to 40 meteors per hour.',
      icon: '☄️'
    },
    '2025-01-13': {
      title: 'New Moon',
      type: 'moon',
      description: 'Perfect time for stargazing and deep-sky observations.',
      icon: '🌑'
    },
    '2025-01-29': {
      title: 'Full Moon - Wolf Moon',
      type: 'moon',
      description: 'The first full moon of the year, traditionally called the Wolf Moon.',
      icon: '🌕'
    },
    
    // February 2025
    '2025-02-12': {
      title: 'New Moon',
      type: 'moon',
      description: 'Ideal conditions for deep-sky photography and observation.',
      icon: '🌑'
    },
    '2025-02-27': {
      title: 'Full Moon - Snow Moon',
      type: 'moon',
      description: 'February\'s full moon, known as the Snow Moon.',
      icon: '🌕'
    },
    
    // March 2025
    '2025-03-14': {
      title: 'New Moon',
      type: 'moon',
      description: 'Dark skies perfect for astronomical observations.',
      icon: '🌑'
    },
    '2025-03-20': {
      title: 'Spring Equinox',
      type: 'seasonal',
      description: 'First day of spring in the Northern Hemisphere.',
      icon: '🌸'
    },
    '2025-03-29': {
      title: 'Full Moon - Worm Moon',
      type: 'moon',
      description: 'March\'s full moon, signaling the end of winter.',
      icon: '🌕'
    },
    
    // April 2025
    '2025-04-13': {
      title: 'New Moon',
      type: 'moon',
      description: 'Excellent time for viewing faint celestial objects.',
      icon: '🌑'
    },
    '2025-04-22': {
      title: 'Lyrids Meteor Shower Peak',
      type: 'meteor',
      description: 'Annual meteor shower with 15-20 meteors per hour.',
      icon: '☄️'
    },
    '2025-04-27': {
      title: 'Full Moon - Pink Moon',
      type: 'moon',
      description: 'April\'s full moon, named after spring flowers.',
      icon: '🌕'
    },
    
    // May 2025
    '2025-05-05': {
      title: 'Eta Aquariids Meteor Shower Peak',
      type: 'meteor',
      description: 'Best meteor shower for Southern Hemisphere viewers.',
      icon: '☄️'
    },
    '2025-05-12': {
      title: 'New Moon',
      type: 'moon',
      description: 'Prime time for deep-sky observations.',
      icon: '🌑'
    },
    '2025-05-26': {
      title: 'Full Moon - Flower Moon',
      type: 'moon',
      description: 'May\'s full moon, celebrating spring blooms.',
      icon: '🌕'
    },
    
    // June 2025
    '2025-06-11': {
      title: 'New Moon',
      type: 'moon',
      description: 'Ideal for astrophotography and stargazing.',
      icon: '🌑'
    },
    '2025-06-21': {
      title: 'Summer Solstice',
      type: 'seasonal',
      description: 'Longest day of the year in the Northern Hemisphere.',
      icon: '☀️'
    },
    '2025-06-25': {
      title: 'Full Moon - Strawberry Moon',
      type: 'moon',
      description: 'June\'s full moon, marking the strawberry harvest.',
      icon: '🌕'
    },
    
    // July 2025
    '2025-07-10': {
      title: 'New Moon',
      type: 'moon',
      description: 'Perfect conditions for summer stargazing.',
      icon: '🌑'
    },
    '2025-07-24': {
      title: 'Full Moon - Buck Moon',
      type: 'moon',
      description: 'July\'s full moon, when deer antlers are in full growth.',
      icon: '🌕'
    },
    '2025-07-30': {
      title: 'Delta Aquariids Meteor Shower Peak',
      type: 'meteor',
      description: 'Southern meteor shower with 15-20 meteors per hour.',
      icon: '☄️'
    },
    
    // August 2025
    '2025-08-09': {
      title: 'New Moon',
      type: 'moon',
      description: 'Excellent time for deep-sky observations.',
      icon: '🌑'
    },
    '2025-08-12': {
      title: 'Perseids Meteor Shower Peak',
      type: 'meteor',
      description: 'One of the most spectacular meteor showers with 60+ meteors per hour.',
      icon: '☄️'
    },
    '2025-08-22': {
      title: 'Full Moon - Sturgeon Moon',
      type: 'moon',
      description: 'August\'s full moon, named after the fish.',
      icon: '🌕'
    },
    
    // September 2025
    '2025-09-07': {
      title: 'New Moon',
      type: 'moon',
      description: 'Perfect for autumn stargazing sessions.',
      icon: '🌑'
    },
    '2025-09-21': {
      title: 'Full Moon - Harvest Moon',
      type: 'moon',
      description: 'September\'s full moon, closest to the autumn equinox.',
      icon: '🌕'
    },
    '2025-09-23': {
      title: 'Autumn Equinox',
      type: 'seasonal',
      description: 'First day of autumn in the Northern Hemisphere.',
      icon: '🍂'
    },
    
    // October 2025
    '2025-10-07': {
      title: 'New Moon',
      type: 'moon',
      description: 'Ideal for observing autumn constellations.',
      icon: '🌑'
    },
    '2025-10-20': {
      title: 'Full Moon - Hunter\'s Moon',
      type: 'moon',
      description: 'October\'s full moon, traditionally for hunting.',
      icon: '🌕'
    },
    '2025-10-21': {
      title: 'Orionids Meteor Shower Peak',
      type: 'meteor',
      description: 'Fast meteors from Halley\'s Comet debris.',
      icon: '☄️'
    },
    
    // November 2025
    '2025-11-05': {
      title: 'New Moon',
      type: 'moon',
      description: 'Perfect for winter constellation viewing.',
      icon: '🌑'
    },
    '2025-11-17': {
      title: 'Leonids Meteor Shower Peak',
      type: 'meteor',
      description: 'Swift meteors that can produce spectacular displays.',
      icon: '☄️'
    },
    '2025-11-19': {
      title: 'Full Moon - Beaver Moon',
      type: 'moon',
      description: 'November\'s full moon, time when beavers prepare for winter.',
      icon: '🌕'
    },
    
    // December 2025
    '2025-12-04': {
      title: 'New Moon',
      type: 'moon',
      description: 'Excellent for winter deep-sky observations.',
      icon: '🌑'
    },
    '2025-12-14': {
      title: 'Geminids Meteor Shower Peak',
      type: 'meteor',
      description: 'The best meteor shower of the year with 60+ meteors per hour.',
      icon: '☄️'
    },
    '2025-12-19': {
      title: 'Full Moon - Cold Moon',
      type: 'moon',
      description: 'December\'s full moon, marking the depths of winter.',
      icon: '🌕'
    },
    '2025-12-21': {
      title: 'Winter Solstice',
      type: 'seasonal',
      description: 'Shortest day of the year in the Northern Hemisphere.',
      icon: '❄️'
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'meteor': return 'bg-orange-500';
      case 'moon': return 'bg-blue-500';
      case 'seasonal': return 'bg-green-500';
      case 'planet': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meteor': return <Star className="w-4 h-4" />;
      case 'moon': return <Moon className="w-4 h-4" />;
      case 'seasonal': return <Sun className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-gray-700"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hasEvent = astroEvents[dateKey];
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      
      days.push(
        <div
          key={day}
          className={`h-20 border border-gray-700 p-1 cursor-pointer relative transition-all duration-200 ${
            isToday ? 'bg-blue-900 border-blue-400' : 'hover:bg-gray-800'
          }`}
          onClick={() => hasEvent && setSelectedDate(hasEvent)}
        >
          <div className={`text-sm font-medium ${isToday ? 'text-blue-300' : 'text-white'}`}>
            {day}
          </div>
          {hasEvent && (
            <div className="absolute bottom-1 left-1 right-1">
              <div className={`text-xs p-1 rounded truncate ${getEventTypeColor(hasEvent.type)} text-white`}>
                <span className="mr-1">{hasEvent.icon}</span>
                {hasEvent.title}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const upcoming = [];
    
    Object.entries(astroEvents).forEach(([date, event]) => {
      const eventDate = new Date(date);
      if (eventDate >= today) {
        upcoming.push({ date: eventDate, ...event });
      }
    });
    
    return upcoming.sort((a, b) => a.date - b.date).slice(0, 5);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-8 rounded-lg shadow-2xl max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-white mb-4 text-center">
          🌌 Astronomical Events Calendar 2025
        </h2>
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setViewMode('month')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              viewMode === 'month'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Monthly View
          </button>
          <button
            onClick={() => setViewMode('events')}
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              viewMode === 'events'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Upcoming Events
          </button>
        </div>
      </div>

      {viewMode === 'month' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <h3 className="text-2xl font-bold text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-gray-400 font-medium p-2">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            {selectedDate ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  {getEventTypeIcon(selectedDate.type)}
                  {selectedDate.title}
                </h3>
                <div className="text-4xl mb-4">{selectedDate.icon}</div>
                <p className="text-gray-300 leading-relaxed">{selectedDate.description}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mt-4 ${getEventTypeColor(selectedDate.type)}`}>
                  {selectedDate.type.charAt(0).toUpperCase() + selectedDate.type.slice(1)}
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                  {getUpcomingEvents().map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
                      <div className="text-2xl">{event.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">{event.title}</div>
                        <div className="text-xs text-gray-400">
                          {event.date.toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getUpcomingEvents().slice(0, 12).map((event, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{event.icon}</div>
                <div>
                  <h3 className="font-bold text-white text-lg">{event.title}</h3>
                  <div className="text-sm text-gray-400">
                    {event.date.toLocaleDateString('en-US', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{event.description}</p>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mt-4 ${getEventTypeColor(event.type)}`}>
                {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AstroEventCalendar;
