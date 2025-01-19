// src/components/Banner/Banner.jsx
import { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Briefcase, 
  Building2, 
  Users, 
  Search,
  Star,
  Rocket,
  Target,
  Clock,
  Code,
  LineChart,
  Award,
  Globe,
  Laptop,
  Layers
} from 'lucide-react';

// Modern floating icon with hover effects
const FloatingIcon = ({ icon: Icon, className, delay = 0 }) => (
  <div 
    className={`absolute ${className} animate-floating`} 
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="relative group">
      <div className="absolute inset-0 bg-white/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
      <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-2xl relative transform hover:scale-110 hover:-rotate-6 transition-all duration-300">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

// Background particle element
const Particle = ({ className }) => (
  <div className={`absolute w-2 h-2 rounded-full bg-white/20 ${className} animate-pulse`} />
);

const bannerData = [
  {
    id: 1,
    image: "/api/placeholder/1920/600",
    title: "Find Your Dream Job",
    subtitle: "Start Your Journey",
    description: "Thousands of jobs in the computer, engineering and technology sectors are waiting for you.",
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    icons: [
      { icon: Briefcase, position: "top-20 left-1/4", delay: 0 },
      { icon: Search, position: "top-40 right-1/4", delay: 200 },
      { icon: Star, position: "bottom-32 left-1/3", delay: 400 },
      { icon: Building2, position: "top-1/2 right-1/3", delay: 600 },
      { icon: Code, position: "bottom-40 right-1/4", delay: 800 },
      { icon: LineChart, position: "top-24 left-1/3", delay: 1000 }
    ]
  },
  {
    id: 2,
    image: "/api/placeholder/1920/600",
    title: "Connect With Top Companies",
    subtitle: "Build Your Network",
    description: "Get hired by the most prestigious companies in the industry.",
    gradient: "from-purple-600 via-pink-600 to-rose-600",
    icons: [
      { icon: Building2, position: "top-24 left-1/3", delay: 0 },
      { icon: Users, position: "bottom-40 right-1/4", delay: 200 },
      { icon: Target, position: "top-1/2 left-1/4", delay: 400 },
      { icon: Globe, position: "bottom-32 right-1/3", delay: 600 },
      { icon: Award, position: "top-32 right-1/4", delay: 800 },
      { icon: Layers, position: "bottom-24 left-1/4", delay: 1000 }
    ]
  },
  {
    id: 3,
    image: "/api/placeholder/1920/600",
    title: "Advance Your Career",
    subtitle: "Reach New Heights",
    description: "Take the next step in your professional journey with us.",
    gradient: "from-rose-600 via-orange-600 to-yellow-600",
    icons: [
      { icon: Rocket, position: "top-32 right-1/3", delay: 0 },
      { icon: Clock, position: "bottom-40 left-1/4", delay: 200 },
      { icon: Laptop, position: "top-1/2 right-1/4", delay: 400 },
      { icon: Target, position: "bottom-32 left-1/3", delay: 600 },
      { icon: Award, position: "top-24 left-1/4", delay: 800 },
      { icon: Star, position: "bottom-24 right-1/4", delay: 1000 }
    ]
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    className: `top-${Math.random() * 100}% left-${Math.random() * 100}%`
  }));

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Background Particles */}
      {particles.map((particle) => (
        <Particle key={particle.id} className={particle.className} />
      ))}

      {/* Slides */}
      {bannerData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out transform ${
            index === currentSlide ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`} />

          {/* Floating Icons */}
          {slide.icons.map((item, i) => (
            <FloatingIcon
              key={i}
              icon={item.icon}
              className={`${item.position} transition-opacity duration-700`}
              delay={item.delay}
            />
          ))}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <span className="text-lg font-light mb-2 opacity-90 tracking-wider animate-fadeIn">
              {slide.subtitle}
            </span>
            <h2 className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn">
              {slide.title}
            </h2>
            <div className="w-24 h-1 bg-white/50 rounded-full mb-6 animate-fadeIn" />
            <p className="text-xl md:text-2xl max-w-3xl leading-relaxed animate-fadeIn delay-100 font-light">
              {slide.description}
            </p>
            <button className="mt-8 px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transform hover:-translate-y-1 transition-all duration-300 animate-fadeIn delay-200 group">
              Explore Opportunities
              <ChevronRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 pointer-events-none">
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-300 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-6 h-6 text-white transform group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {bannerData.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full overflow-hidden ${
              index === currentSlide 
                ? 'w-16 h-2 bg-white' 
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;