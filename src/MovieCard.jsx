import React from "react";
import { POSTER_BASE } from "./api";
import { useAuth } from "./context/authcontext";
import { useMovieContext } from "./context/Moviecontext";
import toastr from 'toastr';

const MovieCard = ({ movie, onSelect = () => {} }) => {
  const { user } = useAuth();
  const { toggleBookmark, isBookmarked } = useMovieContext(); 
  const isAdded = isBookmarked(movie.id); 

  const handleBookmarkClick = (e) => {
    e.stopPropagation();

    if (!user) {
        toastr.warning("Please sign in to bookmark movies.", "Sign In Required");
        return;
    }

    toggleBookmark(movie);

    if (isAdded) {
        toastr.info(`Removed ${movie.title} from library`);
    } else {
        toastr.success(`Added ${movie.title} to library`);
    }
  };

  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <div className="poster-container">
        <img
          src={movie.poster_path ? POSTER_BASE + movie.poster_path : 'https://placehold.co/400x600?text=No+Poster'}
          alt={movie.title}
          loading="lazy"
        />
        <button
          className={`bookmark-btn ${isAdded ? 'bookmarked' : ''}`}
          onClick={handleBookmarkClick}
          title={isAdded ? 'Remove from List' : 'Add to List'}
        >
          {isAdded ? '★ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>
      <div className="movie-info">
        <h3 className="movie-trend-title">{movie.title}</h3>
        
        <div className="meta-row">
          <div className="rating-item">
            <span className="star-icon" style={{color: '#eeff02ff', marginRight: '4px', fontSize:'1.1rem'}}>★</span>
            <span className="Vote-people">{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          <span className="Year-men">{movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;