// src/components/JobSeeker/sections/HeroSection/data.js
export const STATS_DATA = [
    {
      icon: 'Briefcase',
      count: '10,000+',
      label: 'Active Jobs',
    },
    {
      icon: 'Users',
      count: '5,000+',
      label: 'Companies',
    },
    {
      icon: 'TrendingUp',
      count: '20,000+',
      label: 'Job Seekers',
    },
  ];
  
  // src/components/JobSeeker/sections/HeroSection/index.jsx
  import { Search, Briefcase, TrendingUp, Users, ArrowRight } from 'lucide-react';
  
  const HeroSection = ({ onActionClick }) => {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] mix-blend-overlay opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Find Your Dream Job Today
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 animate-fade-in-delay">
              Connect with top companies and opportunities that match your skills
            </p>
  
            {/* Search Bar */}
            <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 animate-fade-in-up">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="w-full py-3 focus:outline-none text-gray-700"
                />
              </div>
              <button
                onClick={() => onActionClick("search")}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 
                         transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Search Jobs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
  
            {/* Quick Stats */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {STATS_DATA.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {stat.icon === 'Briefcase' && <Briefcase className="w-6 h-6" />}
                    {stat.icon === 'Users' && <Users className="w-6 h-6" />}
                    {stat.icon === 'TrendingUp' && <TrendingUp className="w-6 h-6" />}
                    <span className="text-3xl font-bold">{stat.count}</span>
                  </div>
                  <p className="text-blue-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default HeroSection;