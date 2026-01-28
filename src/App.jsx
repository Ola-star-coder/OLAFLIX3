import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.css';
import { AuthProvider } from "./context/authcontext";
import { MovieProvider } from "./context/Moviecontext";

// Components
import Header from "./components/Header"; 
import Sidebar from "./components/Sidebar";
import MovieDetail from "./MovieDetail";
import Bookmarks from "./Bookmarks";
import HomePage from "./pages/HomePage";  
import GenrePage from "./pages/GenrePage"; 

const AppContent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); 

  return (
    <div className="app">
      <Sidebar 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        activeGenre={new URLSearchParams(location.search).get('name')} 
      />

      <div className="main-content">
        <Header setMenuOpen={setMenuOpen} />
        <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/genre/:genreId" element={<GenrePage />} />
           <Route path="/search" element={<GenrePage isSearch={true} />} />
           <Route path="/movie/:id" element={<MovieDetail />} />
           <Route path="/bookmarks" element={
                 <div style={{paddingTop: '0.4rem'}}>
                    <div className="section-title"><h2>Bookmarks</h2></div>
                    <Bookmarks />
                 </div>
            } />
        </Routes>
      </div>
    </div>
  );
}

const App = () => {
    return (
        <AuthProvider>
            <MovieProvider> 
                <Router>
                    <AppContent />
                </Router>
            </MovieProvider>
        </AuthProvider>
    )
}

export default App;