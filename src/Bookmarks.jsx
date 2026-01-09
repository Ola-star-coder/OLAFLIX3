import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

const Bookmarks = ({ bookmarks = [], toggleBookmark, onSelect = () => {} }) => {
  const navigate = useNavigate();
  return (
    <div className="bookmarks-page">
      {bookmarks.length === 0 ? (
        <div className="bookmarks-empty">You dont have any bookmarks yet. Add movies to your list by clicking the bookmark icon on any movie.</div>
      ) : (
        <div className="container">
          {bookmarks.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isBookmarked={true} toggleBookmark={toggleBookmark} onSelect={() => navigate(`/movie/${movie.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
