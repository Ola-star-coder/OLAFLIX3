import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from '../MovieCard';
import { API_BASE, API_KEY, IMG_BASE } from '../api';

const HomePage = ({ toggleBookmark, bookmarks }) => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  //This just fetches data like water(get the joke? fetch... water... never mind)
  const fetchCategory = async (endpoint, setter) => {
    try {
      const res = await fetch(`${API_BASE}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`);
      const data = await res.json();
      if (data.results) setter(data.results);
    } catch (e) { 
        console.error(e);
     }
  };
 
  //   First time using useEffect mehn
  useEffect(() => {
    const loadData = async () => {
      try {
        const trendRes = await fetch(`${API_BASE}/trending/movie/week?api_key=${API_KEY}`);
        const trendData = await trendRes.json();
        
        if (trendData.results && trendData.results.length > 0) {
          setHeroMovie(trendData.results[0]); 
          setTrending(trendData.results.slice(1));
        }
        
        fetchCategory('/movie/top_rated', setTopRated);
        fetchCategory('/movie/upcoming', setUpcoming);
      } catch (e) { console.error(e); }
    };

    loadData();
  }, []);

  return (
    <div className="home-page">
      {heroMovie && (
        <div 
          className="hero-section clickable-hero" 
          onClick={() => navigate(`/movie/${heroMovie.id}`)}
          style={{
             backgroundImage: `linear-gradient(to right, #0d0f11 20%, transparent 100%), url(${IMG_BASE + heroMovie.backdrop_path})`
          }}
        >
          <div className="hero-content">
            <h1>{heroMovie.title}</h1>
            <p>{heroMovie.release_date?.split('-')[0]} • {heroMovie.vote_average?.toFixed(1)} Rating</p>
            <p className="hero-overview">{heroMovie.overview}</p>
            <button className="watch-btn" onClick={(e) => { e.stopPropagation(); navigate(`/movie/${heroMovie.id}`); }}>
                Watch Now
            </button>
          </div>
        </div>
      )}

      <div className="section-title"><h2>Trending This Week</h2></div>
      <div className="row-container">
        {trending.map(movie => (
           <MovieCard key={movie.id} movie={movie} isBookmarked={bookmarks.some(b => b.id === movie.id)} toggleBookmark={toggleBookmark} onSelect={() => navigate(`/movie/${movie.id}`)} />
        ))}
      </div>

      <div className="section-title"><h2>Top Rated</h2></div>
      <div className="row-container">
        {topRated.map(movie => (
           <MovieCard key={movie.id} movie={movie} isBookmarked={bookmarks.some(b => b.id === movie.id)} toggleBookmark={toggleBookmark} onSelect={() => navigate(`/movie/${movie.id}`)} />
        ))}
      </div>

      <div className="section-title"><h2>Upcoming Movies</h2></div>
      <div className="row-container">
        {upcoming.map(movie => (
           <MovieCard key={movie.id} movie={movie} isBookmarked={bookmarks.some(b => b.id === movie.id)} toggleBookmark={toggleBookmark} onSelect={() => navigate(`/movie/${movie.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;