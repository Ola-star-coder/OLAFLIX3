import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import { API_BASE, API_KEY } from './api';

import Header from "./components/Header"; 
import Sidebar from "./components/Sidebar";
import MovieDetail from "./MovieDetail";
import Bookmarks from "./Bookmarks";
import HomePage from "./pages/HomePage";  
import GenrePage from "./pages/GenrePage"; 

// Whole app structure is passed here
const AppContent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const location = useLocation(); 

  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem('bookmarks') || '[]'); }
    catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (movie) => {
    setBookmarks((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) return prev.filter((m) => m.id !== movie.id);
      return [{ id: movie.id, title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average, backdrop_path: movie.backdrop_path }, ...prev];
    });
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch(`${API_BASE}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (e) { console.error('Failed to load genres', e); }
    };
    fetchGenres();
  }, []);


  return (
    // sidebar and main content
    <div className="app">
      <Sidebar 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        genres={genres} 
        bookmarks={bookmarks}
        activeGenre={new URLSearchParams(location.search).get('name')} 
       />

      <div className="main-content">
      <Header setMenuOpen={setMenuOpen} />
        <Routes>
           <Route path="/" element={<HomePage toggleBookmark={toggleBookmark} bookmarks={bookmarks} />} />
           <Route path="/genre/:genreId" element={<GenrePage toggleBookmark={toggleBookmark} bookmarks={bookmarks} />} />
           <Route path="/search" element={<GenrePage toggleBookmark={toggleBookmark} bookmarks={bookmarks} isSearch={true} />} />
           <Route path="/movie/:id" element={<MovieDetail toggleBookmark={toggleBookmark} bookmarks={bookmarks} />} />
           <Route path="/bookmarks" element={
                 <div style={{paddingTop: '0.4rem'}}>
                    <div className="section-title"><h2>Bookmarks</h2></div>
                    <Bookmarks bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
                 </div>
            } />
        </Routes>
      </div>
    </div>
  );
}

const App = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App;