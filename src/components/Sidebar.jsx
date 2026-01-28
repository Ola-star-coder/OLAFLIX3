import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';
import { useMovieContext } from '../context/Moviecontext';

const Sidebar = ({ menuOpen, setMenuOpen, activeGenre }) => {
  const { user, signInGoogle, logout } = useAuth(); 
  const { genres, bookmarks } = useMovieContext(); 

  return (
    <>
      <div className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
            <h3 className="sidebar-title" style={{marginTop:'0.3em'}}>Genres</h3>
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

        <h3 className="sidebar-title" style={{marginTop: '2rem', color: '#fff'}}>Account</h3>
        <ul className="genre-list">
            {user ? (
                <>
                    <li style={{color: '#ffffff', fontSize:'1rem', cursor:'default', fontWeight:'normal'}}>
                        Hi, {user.displayName ? user.displayName.split(' ')[0] : 'Member'}
                    </li>
                    <li onClick={() => { logout(); setMenuOpen(false); }} style={{color: '#b3b3b3', cursor:'pointer'}}>
                        Sign Out
                    </li>
                </>
            ) : (
                <li onClick={() => { signInGoogle(); setMenuOpen(false); }} style={{color: '#b3b3b3', cursor:'pointer'}}>
                    Sign In 
                </li>
            )}
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