import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE, API_KEY, POSTER_BASE } from './api';
import MovieCard from './MovieCard';

const MovieDetail = ({ toggleBookmark, bookmarks = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [details, setDetails] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  
  const isBookmarked = details ? bookmarks.some(b => b.id === Number(id)) : false;

  useEffect(() => {
    if (!id) return;
    window.scrollTo(0, 0);

    const fetchAll = async () => {
      try {
        const [dRes, cRes, vRes, sRes] = await Promise.all([
          fetch(`${API_BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`${API_BASE}/movie/${id}/credits?api_key=${API_KEY}`),
          fetch(`${API_BASE}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
          fetch(`${API_BASE}/movie/${id}/similar?api_key=${API_KEY}&language=en-US`)
        ]);

        const [d, c, v, s] = await Promise.all([dRes.json(), cRes.json(), vRes.json(), sRes.json()]);
        
        setDetails(d);
        setCredits(c);
        setVideos(v.results || []);
        setSimilar(s.results || []);
      } catch (e) { console.error(e); }
    }

    fetchAll();
  }, [id]);

  if (!details) return <div className="loading-spinner" style={{padding:'2rem'}}>Loading details...</div>;

  const director = credits?.crew?.find((m) => m.job === 'Director');
  const starring = credits?.cast?.slice(0,6) || [];
  
  const trailers = videos
    .filter(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'))
    .slice(0, 3);

  return (
    <div className="detail-page">
      <div className="detail-grid">
        <div className="detail-poster">
          <img 
            src={details.poster_path ? POSTER_BASE + details.poster_path : 'https://placehold.co/500x750'} 
            alt={details.title} 
          />
        </div>
        <div className="detail-body">
          <h1>{details.title}</h1>
          <div className="detail-meta">
            <span>{details.release_date?.split('-')[0]}</span>
            <span>•</span>
            <span>{details.runtime ? `${details.runtime}m` : ''}</span>
            <button 
                className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`} 
                onClick={() => toggleBookmark(details)} 
                style={{marginLeft: '12px', position: 'static'}}
            >
                {isBookmarked ? '★' : '☆'}
            </button>
          </div>

          <p className="hero-overview" style={{maxWidth:'680px'}}>{details.overview}</p>

          <div className="credits">
            <div><strong>Directed by:</strong> {director?.name || '—'}</div>
            <div style={{marginTop: '8px'}}><strong>Starring:</strong> {starring.map(s => s.name).join(', ')}</div>
          </div>
        </div>
      </div>
  
      {trailers.length > 0 && (
        <div className='row-helper' style={{marginTop: '3rem'}}>
            <h3>Trailers & Clips</h3>
            <div className="row-container">
            {trailers.map(video => (
                <div key={video.key} className="video-card">
                <iframe
                    title={video.name}
                    src={`https://www.youtube.com/embed/${video.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                </div>
            ))}
            </div>
        </div>
      )}


      {similar.length > 0 && (
        <div className='row-helper'>
            <h3>You May Also Like</h3>
            <div className="row-container">
            {similar.map(m => (
                <MovieCard 
                key={m.id} 
                movie={m} 
                isBookmarked={bookmarks.some(b => b.id === m.id)} 
                toggleBookmark={toggleBookmark} 
                onSelect={() => navigate(`/movie/${m.id}`)} 
                />
            ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;