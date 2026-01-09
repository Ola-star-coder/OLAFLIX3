import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../search.svg'; 

const Header = ({ setMenuOpen }) => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();  

  //Nothing fancy, just returning home without reload
  const goHome = () => {
    navigate('/');
    setMobileSearchOpen(false);
  };

   // Handle search on Enter key press nothing fancy
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setMobileSearchOpen(false); 
    }
  };
  
  //rendering
  return (
    <header className="header">
      <div className="desktop-header-content">
        <div className="logo" onClick={goHome}>
           <span>Tvflix</span>
        </div>
        <div className="search-box">
           <img src={SearchIcon} alt="search" width="25" />
           <input
             placeholder="Search any movies..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             onKeyDown={handleSearch}
           />
        </div>
      </div>
      
      {/* //mobile version */}
      <div className="mobile-header-content">
        {mobileSearchOpen ? (
          <div className="mobile-search-bar">
            <div className="search-input-wrapper">
               <img src={SearchIcon} alt="search" width="20" style={{opacity: 0.5}} />
               <input 
                  autoFocus
                  placeholder="Search any movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
               />
            </div>
            <button className="close-search-btn" onClick={() => setMobileSearchOpen(false)}>
              ✕
            </button>
          </div>
        ) : (
          <>
            <div className="nav-left">
              <div className="logo" onClick={goHome}>
                <span>Tvflix</span>
              </div>
            </div>
            <div className="nav-right">
               <div className="img-cover" onClick={() => setMobileSearchOpen(true)}>
                 <img src={SearchIcon} alt="search" width="22" />
                </div> 
                <div className="menu-icon" onClick={() => setMenuOpen(true)}><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg></div>
            </div>
          </>
        )}
      </div>

    </header>
  );
};

export default Header;