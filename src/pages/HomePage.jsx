import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../MovieCard';
import { API_BASE, API_KEY, IMG_BASE } from '../api';

const HomePage = () => {
  const [heroMovies, setHeroMovies] = useState([]); 
  const [currentSlide, setCurrentSlide] = useState(0); 
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  const fetchCategory = async (endpoint, setter) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`);
      const data = await res.json();
      if (data.results) setter(data.results);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const heroResults = await fetch(`${API_BASE}/trending/movie/day?api_key=${API_KEY}&page=1`);
        const heroData = await heroResults.json();

        if(heroData.results){
         setHeroMovies(heroData.results.slice(0, 20));
        }

         const trendRes = await fetch(`${API_BASE}/trending/movie/week?api_key=${API_KEY}&page=1`);
         const trendData = await trendRes.json();
         
         if (trendData.results) {
          setTrending(trendData.results);
         }
         
         fetchCategory('/movie/top_rated', setTopRated);
         fetchCategory('/movie/upcoming', setUpcoming);
      } catch (e) { console.error(e); }
    };

    loadData();
  }, []);

  const nextSlide = (e) => {
    e && e.stopPropagation();
    setCurrentSlide((prev) => (prev === heroMovies.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e) => {
    e && e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? heroMovies.length - 1 : prev - 1));
  };

  return (
    <div className="home-page">
      <div className="hero-slider-window">
        <button className="slider-btn prev-btn" onClick={prevSlide}>&#10094;</button>
        <button className="slider-btn next-btn" onClick={nextSlide}>&#10095;</button>
        <div 
          className="hero-slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroMovies.map((movie) => (
            <div 
              key={movie.id}
              className="hero-section clickable-hero"
              onClick={() => navigate(`/movie/${movie.id}`)}
              style={{
                backgroundImage: `linear-gradient(to right, #0d0f11 20%, transparent 100%), url(${IMG_BASE + movie.backdrop_path})`
              }}
            >
          <div className="hero-content">
          <h1>{movie.title}</h1>
          <p>{movie.release_date?.split('-')[0]} • {movie.vote_average?.toFixed(1)} Rating</p>
          <p className="hero-overview">{movie.overview}</p>
          <button 
          className="watch-btn" 
          onClick={(e) => { e.stopPropagation(); navigate(`/movie/${movie.id}`); }}
          >
          Watch Now
          </button>
          </div>
          </div>
          ))}
        </div>
      </div>

      <div className="section-title"><h2>Trending This Week</h2></div>
      <div className="row-container">
        {trending.map(movie => (
           <MovieCard key={movie.id} movie={movie} onSelect={() => navigate(`/movie/${movie.id}`)} />
        ))}
      </div>
      
       <div className="section-title"><h2>Top Rated</h2></div>
      <div className="row-container">
        {topRated.map(movie => (
           <MovieCard key={movie.id} movie={movie} onSelect={() => navigate(`/movie/${movie.id}`)} />
        ))}
      </div>

      <div className="section-title"><h2>Upcoming Movies</h2></div>
      <div className="row-container">
        {upcoming.map(movie => (
           <MovieCard key={movie.id} movie={movie} onSelect={() => navigate(`/movie/${movie.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;