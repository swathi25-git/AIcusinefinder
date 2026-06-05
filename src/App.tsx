/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Search, 
  Star, 
  ArrowLeft, 
  Heart, 
  ShieldCheck, 
  Zap, 
  History,
  LogOut,
  User,
  MessageSquare,
  Navigation,
  Clock,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Restaurant, Dish, CuisineType, Category, UserProfile, PriceCategory } from './types';
import { MOCK_RESTAURANTS, CITY_SPECIALTIES, CITY_SPECIALTY_DATA } from './data/mockData';

// --- Components ---

const Logo = () => (
  <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-zinc-900">
    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
      <Zap size={24} fill="currentColor" />
    </div>
    <span className="font-display">Flavor<span className="text-emerald-600">Lens</span></span>
  </div>
);

const TrustBadge = ({ score }: { score: number }) => (
  <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">
    <ShieldCheck size={12} />
    <span>{score}% Trust</span>
  </div>
);

const TasteMatchBadge = ({ match }: { match: number }) => (
  <div className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-bold border border-indigo-100 uppercase tracking-wider">
    <Heart size={12} fill="currentColor" />
    <span>{match}% Match</span>
  </div>
);

const AuthenticityBadge = ({ score }: { score: number }) => (
  <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-lg text-[10px] font-bold border border-amber-100 uppercase tracking-wider">
    <Star size={12} fill="currentColor" />
    <span>{score}% Authentic</span>
  </div>
);

// --- Main App ---

export default function App() {
  const [currentCity, setCurrentCity] = useState('Mumbai');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad'];

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserProfile({
      name: "Gourmet Explorer",
      preferences: [CuisineType.INDIAN, CuisineType.STREET_FOOD],
      budget: PriceCategory.MODERATE,
      history: ["mumbai-0", "delhi-1"]
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

  const handleLocationDetection = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        alert(`Detected Location: ${position.coords.latitude.toFixed(2)}, ${position.coords.longitude.toFixed(2)}. Defaulting to Mumbai for demo.`);
        setCurrentCity('Mumbai');
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const filteredRestaurants = useMemo(() => {
    return MOCK_RESTAURANTS.filter(r => 
      r.city === currentCity && 
      (r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       r.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  }, [currentCity, searchQuery]);

  const getTasteMatch = (restaurant: Restaurant) => {
    if (!userProfile) return 85; 
    const hasPref = restaurant.cuisine.some(c => userProfile.preferences.includes(c));
    return hasPref ? 95 : 70;
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="cursor-pointer" onClick={() => setSelectedRestaurant(null)}>
            <Logo />
          </div>

          <div className="hidden md:flex items-center bg-zinc-100 rounded-full px-4 py-2 w-full max-w-md border border-zinc-200 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
            <Search size={18} className="text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search restaurants, cuisines, or dishes..." 
              className="bg-transparent border-none focus:ring-0 w-full ml-2 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">
              <MapPin size={16} className="text-emerald-600" />
              <select 
                className="bg-transparent border-none focus:ring-0 text-sm font-bold p-0"
                value={currentCity}
                onChange={(e) => setCurrentCity(e.target.value)}
              >
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
              <button 
                onClick={handleLocationDetection}
                className="p-1 hover:bg-zinc-200 rounded-md transition-colors"
                title="Detect Current Location"
              >
                <Navigation size={14} className="text-zinc-500" />
              </button>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 border border-emerald-200">
                  <User size={20} />
                </div>
                <button 
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-red-600 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="bg-zinc-900 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-zinc-800 transition-all shadow-md active:scale-95"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <AnimatePresence mode="wait">
          {!selectedRestaurant ? (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero Section */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 font-display">
                  Discover {currentCity}'s <span className="text-emerald-600 italic">Hidden Gems</span>
                </h1>
                <p className="text-zinc-500 text-lg max-w-2xl font-medium">
                  Intelligent recommendations based on authenticity, trust, and your unique taste profile. 
                  Specializing in <span className="font-bold text-zinc-900 underline decoration-emerald-500 decoration-2 underline-offset-4">{CITY_SPECIALTIES[currentCity]?.join(' & ')}</span>.
                </p>
              </div>

              {/* Recommendations Section */}
              {isLoggedIn && (
                <div className="mb-12 p-8 bg-emerald-900 rounded-[2.5rem] text-white overflow-hidden relative shadow-2xl">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black mb-2 flex items-center gap-3 font-display">
                      <Zap size={32} className="text-emerald-400" />
                      Tailored for You, {userProfile?.name}
                    </h2>
                    <p className="text-emerald-100/80 mb-8 font-medium">Based on your love for {userProfile?.preferences.join(', ')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredRestaurants.slice(0, 3).map(restaurant => (
                        <div 
                          key={`rec-${restaurant.id}`}
                          onClick={() => setSelectedRestaurant(restaurant)}
                          className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl cursor-pointer hover:bg-white/20 transition-all group"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="font-bold text-xl leading-tight">{restaurant.name}</h3>
                            <TasteMatchBadge match={getTasteMatch(restaurant)} />
                          </div>
                          <div className="flex items-center gap-2 text-sm text-emerald-200 font-medium">
                            <MapPin size={14} />
                            {restaurant.location}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
                </div>
              )}

              {/* Restaurant Grid */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black font-display">{filteredRestaurants.length} Restaurants in {currentCity}</h2>
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-500">
                  <Clock size={16} />
                  <span>Delivery in 30-45 mins</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredRestaurants.map((restaurant) => (
                  <motion.div 
                    layoutId={restaurant.id}
                    key={restaurant.id}
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="group bg-white rounded-[2rem] overflow-hidden border border-zinc-200 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all cursor-pointer"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <TrustBadge score={restaurant.trustScore} />
                        <AuthenticityBadge score={restaurant.authenticityScore} />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1 shadow-sm">
                          <Star size={12} className="text-amber-500 fill-amber-500" />
                          {restaurant.rating}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-xl leading-tight group-hover:text-emerald-600 transition-colors font-display">
                          {restaurant.name}
                        </h3>
                        <TasteMatchBadge match={getTasteMatch(restaurant)} />
                      </div>
                      <p className="text-zinc-500 text-sm mb-4 flex items-center gap-1 font-medium">
                        <MapPin size={14} /> {restaurant.location} • {restaurant.priceCategory}
                      </p>
                      <p className="text-zinc-400 text-xs mb-4 line-clamp-2 italic">
                        "{restaurant.description}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.cuisine.map(c => (
                          <span key={c} className="text-[10px] uppercase tracking-widest font-black text-zinc-400 border border-zinc-100 px-2 py-0.5 rounded-md">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-6xl mx-auto"
            >
              {/* Back Button */}
              <button 
                onClick={() => setSelectedRestaurant(null)}
                className="mb-8 flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-bold uppercase tracking-widest text-xs"
              >
                <ArrowLeft size={18} />
                Back to Discovery
              </button>

              {/* Restaurant Header */}
              <div className="bg-white rounded-[3rem] overflow-hidden border border-zinc-200 shadow-sm mb-12">
                <div className="relative h-[28rem]">
                  <img 
                    src={selectedRestaurant.image} 
                    alt={selectedRestaurant.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <TrustBadge score={selectedRestaurant.trustScore} />
                      <AuthenticityBadge score={selectedRestaurant.authenticityScore} />
                      <TasteMatchBadge match={getTasteMatch(selectedRestaurant)} />
                      <div className="bg-white/20 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest border border-white/20">
                        {selectedRestaurant.priceCategory} Category
                      </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-4 font-display tracking-tighter">{selectedRestaurant.name}</h1>
                    <div className="flex flex-wrap items-center gap-6 text-zinc-200 font-bold">
                      <div className="flex items-center gap-2">
                        <MapPin size={20} className="text-emerald-400" />
                        {selectedRestaurant.location}, {selectedRestaurant.city}
                      </div>
                      <div className="flex items-center gap-2">
                        <Star size={20} className="text-amber-400 fill-amber-400" />
                        {selectedRestaurant.rating} (Verified Reviews)
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-3 text-emerald-600 font-black mb-4 uppercase tracking-widest text-sm">
                      <History size={20} />
                      Our Heritage & History
                    </div>
                    <p className="text-zinc-600 leading-relaxed text-xl font-medium italic">
                      "{selectedRestaurant.history}"
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100">
                    <h4 className="font-black mb-4 uppercase tracking-widest text-xs text-zinc-400">Recent Reviews</h4>
                    <div className="space-y-4">
                      {selectedRestaurant.reviews.slice(0, 2).map(review => (
                        <div key={review.id} className="text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold">{review.user}</span>
                            <div className="flex items-center text-amber-500">
                              <Star size={10} fill="currentColor" />
                              <span className="ml-0.5 text-[10px]">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-zinc-500 italic">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* City Specialty Section - Displayed First */}
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black font-display flex items-center gap-3">
                    <Zap size={32} className="text-emerald-600" />
                    {currentCity}'s Local Specialties
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {CITY_SPECIALTY_DATA[currentCity]?.map(dish => (
                    <div key={dish.id} className="bg-white p-6 rounded-[2rem] border-2 border-emerald-100 flex flex-col gap-4 hover:border-emerald-500 transition-all group shadow-lg shadow-emerald-500/5">
                      <div className="h-48 rounded-2xl overflow-hidden relative">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                        <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Local Legend</div>
                      </div>
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-black font-display">{dish.name}</h3>
                          <span className="font-black text-emerald-600">₹{dish.price}</span>
                        </div>
                        <p className="text-zinc-500 text-sm font-medium mb-4">{dish.description}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-black">
                            <Star size={10} className="fill-amber-700" />
                            {dish.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Popular Items from Restaurant */}
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-black font-display flex items-center gap-3">
                    <Star size={32} className="text-amber-500 fill-amber-500" />
                    Signature Dishes
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedRestaurant.menu.filter(d => d.isPopular).map(dish => (
                    <div key={dish.id} className="bg-zinc-900 text-white rounded-[2.5rem] p-8 flex gap-8 items-center shadow-2xl shadow-zinc-900/20 relative overflow-hidden group">
                      <div className="w-40 h-40 rounded-3xl overflow-hidden flex-shrink-0 border-2 border-white/10">
                        <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-2xl font-black font-display">{dish.name}</h3>
                          <span className="font-black text-emerald-400 text-xl">₹{dish.price}</span>
                        </div>
                        <p className="text-zinc-400 text-sm mb-4 font-medium line-clamp-2">{dish.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs font-black">
                            <Star size={12} className="fill-white" />
                            {dish.rating}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Bestseller</span>
                        </div>
                      </div>
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Full Menu */}
              <section className="mb-20">
                <h2 className="text-3xl font-black mb-12 font-display">Explore the Menu</h2>
                <div className="space-y-16">
                  {[Category.STARTER, Category.MAIN_COURSE, Category.STREET_FOOD, Category.DESSERT, Category.BEVERAGE].map(category => {
                    const items = selectedRestaurant.menu.filter(d => d.category === category && !d.isPopular);
                    if (items.length === 0) return null;
                    return (
                      <div key={category}>
                        <div className="flex items-center gap-4 mb-8">
                          <h3 className="text-lg font-black uppercase tracking-[0.2em] text-zinc-400">
                            {category}s
                          </h3>
                          <div className="h-px bg-zinc-200 flex-1"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {items.map(dish => (
                            <div key={dish.id} className="bg-white p-5 rounded-3xl border border-zinc-200 flex gap-5 hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/5 transition-all group cursor-pointer">
                              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                              </div>
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">{dish.name}</h4>
                                    <span className="font-black text-zinc-900">₹{dish.price}</span>
                                  </div>
                                  <p className="text-zinc-500 text-[10px] font-medium mt-1 line-clamp-2">{dish.description}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                  <div className="flex items-center gap-1 text-zinc-400 text-[10px] font-black">
                                    <Star size={10} className="fill-zinc-400" />
                                    {dish.rating}
                                  </div>
                                  <button className="text-zinc-300 hover:text-emerald-600 transition-colors">
                                    <MessageSquare size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Review Section */}
              <section className="bg-zinc-900 text-white p-12 md:p-20 rounded-[4rem] mb-20 relative overflow-hidden">
                <div className="max-w-2xl relative z-10">
                  <h2 className="text-4xl md:text-5xl font-black mb-6 font-display tracking-tighter">Share Your Experience</h2>
                  <p className="text-zinc-400 text-lg mb-10 font-medium">Your reviews help our ML models calculate Trust and Authenticity scores for the community.</p>
                  <div className="space-y-6">
                    <textarea 
                      placeholder="Write a review for your favorite dish..."
                      className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all h-40 font-medium"
                    ></textarea>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex gap-3">
                        {[1,2,3,4,5].map(i => <Star key={i} size={32} className="text-zinc-800 hover:text-amber-400 cursor-pointer transition-colors" />)}
                      </div>
                      <button className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-4 rounded-full font-black hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-600/20 uppercase tracking-widest text-sm">
                        Post Review
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-6 text-zinc-500 max-w-sm font-medium leading-relaxed">
              The next generation of restaurant discovery. Powered by intelligence, driven by authenticity. 
              Discover the true taste of your city with FlavorLens.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-zinc-400">Cities</h4>
            <ul className="space-y-3 text-zinc-600 text-sm font-bold">
              {cities.map(c => <li key={c} className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                <ChevronRight size={14} className="text-emerald-500" />
                {c}
              </li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-xs text-zinc-400">Company</h4>
            <ul className="space-y-3 text-zinc-600 text-sm font-bold">
              <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                <ChevronRight size={14} className="text-emerald-500" />
                About Us
              </li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                <ChevronRight size={14} className="text-emerald-500" />
                ML Technology
              </li>
              <li className="hover:text-emerald-600 cursor-pointer transition-colors flex items-center gap-2">
                <ChevronRight size={14} className="text-emerald-500" />
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-zinc-100 text-center text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">
          © 2026 FlavorLens • Intelligent Restaurant Discovery System
        </div>
      </footer>
    </div>
  );
}
