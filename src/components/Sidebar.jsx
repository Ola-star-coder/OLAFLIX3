import React from 'react';
import { Link } from 'react-router-dom';

// Everything related to sidebar and its rendering, both in desktop and mobile
const Sidebar = ({ menuOpen, setMenuOpen, genres, bookmarks, activeGenre }) => {
  return (
    <>
      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
            <h3 className="sidebar-title" style={{marginTop:'0.3em'}}>Genres</h3>
            {/* This  button closes the sidebar, crarification: there are two close button */}
            <span className="close-btn" onClick={() => setMenuOpen(false)}>✕</span>
        </div>

        <ul className="genre-list">
          {genres.map((g) => (
            <Link to={`/genre/${g.id}?name=${g.name}`} key={g.id} onClick={() => setMenuOpen(false)}>
              <li className={activeGenre === g.name ? 'active' : ''}>{g.name}</li>
            </Link>
          ))}
        </ul>

        <h3 className="sidebar-title">Libraries</h3>
        <ul className="genre-list">
           <Link to="/bookmarks" onClick={() => setMenuOpen(false)}>
              <li>Bookmarks {bookmarks.length ? `(${bookmarks.length})` : ''}</li>
           </Link>
        </ul>

         <h3 className="sidebar-title" style={{marginTop: '2rem', opacity: 0.5}}>LANGUAGE</h3>
        <ul className="genre-list" style={{opacity: 0.5}}>
            <li>English</li>
           <li>French</li>
            <li>Spanish</li>
        </ul>
      </div>
      <div className={`backdrop ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(false)} />
    </>
  );
};

export default Sidebar;