import React from "react";
import { POSTER_BASE } from './api'; 

const MovieCard = ({ movie, isBookmarked = false, toggleBookmark = () => {}, onSelect = () => {} }) => {
  
  return (
    <div className="movie-card" onClick={() => onSelect(movie)}>
      <div className="poster-container">
        <img
          src={movie.poster_path ? POSTER_BASE + movie.poster_path : 'https://placehold.co/400x600?text=No+Poster'}
          alt={movie.title}
          loading="lazy"
        />
        <button
          className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
          onClick={(e) => { e.stopPropagation(); toggleBookmark(movie); }}
          title={isBookmarked ? 'Remove from List' : 'Add to List'}
        >
          {isBookmarked ? '★ Bookmarked' : '☆ Bookmark'}
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