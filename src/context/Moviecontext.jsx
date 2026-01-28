import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_BASE, API_KEY } from '../api';
const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bookmarks') || '[]');
    } catch (e) {
      return [];
    }
  });

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${API_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (e) {
        console.error('Failed to load genres', e);
      }
    };
    fetchGenres();
  }, []);

  const toggleBookmark = (movie) => {
    setBookmarks((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [{ 
        id: movie.id, 
        title: movie.title, 
        poster_path: movie.poster_path, 
        release_date: movie.release_date, 
        vote_average: movie.vote_average, 
        backdrop_path: movie.backdrop_path 
      }, ...prev];
    });
  };

  
  const isBookmarked = (id) => bookmarks.some(b => b.id === Number(id));

  return (
    <MovieContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, genres }}>
      {children}
    </MovieContext.Provider>
  );
};