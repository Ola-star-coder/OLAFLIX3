import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MovieCard from '../MovieCard';
import { API_BASE, API_KEY } from '../api';

const GenrePage = ({ toggleBookmark, bookmarks, isSearch = false }) => {
  const { genreId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const genreName = queryParams.get('name') || 'Movies';
  const searchQuery = queryParams.get('query') || '';

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // This resets when genre or search changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    fetchMovies(1, true);
  }, [genreId, searchQuery]);

  const fetchMovies = async (pageNumber = 1, reset = false) => {
    setLoading(true);
    let url;
    
    if (isSearch) {
       url = `${API_BASE}/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${pageNumber}`;
    } else {
       url = `${API_BASE}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${pageNumber}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.results) {
        setMovies(prev => reset ? data.results : [...prev, ...data.results]);
        setTotalPages(data.total_pages);
        setPage(data.page);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="genre-page">
      <div className="section-title">
        <h2>{isSearch ? `Search Results for: "${searchQuery}"` : `All ${genreName} Movies`}</h2>
      </div>

      <div className="container">
        {movies.map(movie => (
          <MovieCard 
            key={movie.id} 
            movie={movie} 
            isBookmarked={bookmarks.some(b => b.id === movie.id)} 
            toggleBookmark={toggleBookmark} 
            onSelect={() => navigate(`/movie/${movie.id}`)} 
           />
        ))}
      </div>

      {loading && <div className="loading-spinner">Loading...</div>}

      {!loading && page < totalPages && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <button className="watch-btn" onClick={() => fetchMovies(page + 1)}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default GenrePage;