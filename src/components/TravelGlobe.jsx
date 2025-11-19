import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Globe from 'react-globe.gl';
import { X, Calendar, Trophy, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react'; 

// --- 环形进度条组件 ---
const ProgressRing = ({ label, current, total, delay }) => {
   const radius = 36;
   const circumference = 2 * Math.PI * radius;
   const percent = Math.min(100, (current / total) * 100);
   const offset = circumference - (percent / 100) * circumference;

   // 这里也加上 sidebar-enter-anim
   return (
     <div className="achievement-item sidebar-enter-anim" style={{ animationDelay: `${delay}s` }}>
       <div className="ring-container">
         <svg width="100" height="100" viewBox="0 0 100 100">
           <circle className="ring-bg" cx="50" cy="50" r={radius} strokeWidth="8" />
           <circle className="ring-progress" cx="50" cy="50" r={radius} strokeWidth="8" strokeDasharray={`${circumference} ${circumference}`} style={{ strokeDashoffset: offset }} transform="rotate(-90 50 50)" />
         </svg>
         <div className="ring-text">
           <span className="ring-value">{current}</span>
           <span className="ring-total">/{total}</span>
         </div>
       </div>
       <div className="achievement-label">{label}</div>
     </div>
   );
};

const TravelGlobe = () => {
  const globeEl = useRef();
  const markerClickRef = useRef(false); 
  
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); 

  // 数据 (保持不变)
  const places = [
    { 
      id: 1, name: 'Beijing', lat: 39.9042, lng: 116.4074, country: 'China', continent: 'Asia', date: '2018.10.01', 
      desc: 'The ancient capital combined with modern vibes.',
      photos: [
        'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1543158352-55f72253951f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1604062657566-753051549943?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    { 
      id: 2, name: 'Tokyo', lat: 35.6895, lng: 139.6917, country: 'Japan', continent: 'Asia', date: '2019.04.15', 
      desc: 'Cherry blossoms and neon lights.',
      photos: [
        'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    { 
      id: 3, name: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia', continent: 'Oceania', date: '2021.12.25', 
      desc: 'Opera House view.',
      photos: [
        'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    { 
      id: 4, name: 'Paris', lat: 48.8566, lng: 2.3522, country: 'France', continent: 'Europe', date: '2023.06.10', 
      desc: 'Sunset at the Eiffel Tower.',
      photos: [
        'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&w=1200&q=80'
      ]
    },
    { 
      id: 5, name: 'New York', lat: 40.7128, lng: -74.0060, country: 'USA', continent: 'North America', date: '2024.01.01', 
      desc: 'Concrete jungle.',
      photos: [
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1538970272646-f61fabb05b3b?auto=format&fit=crop&w=1200&q=80'
      ]
    },
  ];

  const arcsData = useMemo(() => {
    const start = places[0]; 
    return places.slice(1).map(end => ({ startLat: start.lat, startLng: start.lng, endLat: end.lat, endLng: end.lng, color: '#ff8855' }));
  }, [places]);

  const stats = useMemo(() => {
    const uniqueCountries = new Set(places.map(p => p.country)).size;
    const uniqueContinents = new Set(places.map(p => p.continent)).size;
    return { uniqueCountries, uniqueContinents };
  }, [places]);

  useEffect(() => {
    const updateSize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.6;
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 });
      globeEl.current.scene().background = null; 
    }
  }, []);

  useEffect(() => {
    setCurrentPhotoIndex(0);
    setIsLightboxOpen(false);
  }, [selectedPlace]);

  const handlePlaceClick = useCallback((place) => {
    setSelectedPlace(place);
    globeEl.current.pointOfView({ lat: place.lat, lng: place.lng, altitude: 1.8 }, 1500);
    globeEl.current.controls().autoRotate = false;
  }, []);

  const handleGlobeClick = useCallback(() => {
    if (markerClickRef.current) {
      markerClickRef.current = false;
      return;
    }
    if (selectedPlace) {
      setSelectedPlace(null);
      globeEl.current.controls().autoRotate = true;
    }
  }, [selectedPlace]);

  const renderCustomMarker = (d) => {
    const el = document.createElement('div');
    el.className = 'custom-marker-container';
    const isActive = selectedPlace && selectedPlace.id === d.id;
    const color = isActive ? '#d32f2f' : '#ff5533'; 
    const scale = isActive ? '1.3' : '1';
    el.innerHTML = `<div class="marker-pin" style="transform: scale(${scale}); color: ${color}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3" fill="white"/></svg></div><div class="marker-label" style="color: ${isActive ? '#ff5533' : '#333'}">${d.name}</div>`;
    el.onclick = (e) => { markerClickRef.current = true; e.stopPropagation(); handlePlaceClick(d); };
    return el;
  };

  const nextPhoto = (e) => { if(e) e.stopPropagation(); if (selectedPlace?.photos) setCurrentPhotoIndex((prev) => (prev + 1) % selectedPlace.photos.length); };
  const prevPhoto = (e) => { if(e) e.stopPropagation(); if (selectedPlace?.photos) setCurrentPhotoIndex((prev) => (prev - 1 + selectedPlace.photos.length) % selectedPlace.photos.length); };

  return createPortal(
    <div className="full-screen-overlay">
      <div className="globe-layer">
        <Globe
          ref={globeEl}
          width={dimensions.width}
          height={dimensions.height}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="rgba(0,0,0,0)" 
          atmosphereColor="#ff5533"
          atmosphereAltitude={0.15}
          htmlElementsData={places}
          htmlElement={renderCustomMarker}
          onGlobeClick={handleGlobeClick}
          arcsData={arcsData}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={1500}
          arcStroke={0.8}
        />
      </div>

      <div className="sidebar-layer">
        <div className="sidebar-content-wrapper">
          {!selectedPlace && (
            // 增加 key="overview" 确保 React 在切换时彻底重绘，触发动画
            <div className="sidebar-header sidebar-enter-anim" key="overview-header">
              <h1>Footprints</h1>
              <div className="divider"></div>
              <p className="subtitle">My Journey Map</p>
            </div>
          )}

          <div className="sidebar-body">
            {selectedPlace ? (
              // 增加 key="detail" 和新的动画类名
              <div className="detail-container sidebar-enter-anim" key="detail-container">
                <button className="detail-nav-btn" onClick={() => {
                    setSelectedPlace(null);
                    globeEl.current.controls().autoRotate = true;
                }}>
                  <ArrowLeft size={18} /> 
                  <span>Back to Overview</span>
                </button>
                
                <div className="detail-header">
                  <div className="location-badge">{selectedPlace.country}</div>
                  <h2 className="location-name">{selectedPlace.name}</h2>
                  <div className="detail-meta">
                    <Calendar size={14} /> 
                    <span>First visited: {selectedPlace.date}</span>
                  </div>
                </div>

                <div className="detail-description">
                  <p>{selectedPlace.desc}</p>
                </div>

                {selectedPlace.photos && selectedPlace.photos.length > 0 && (
                  <div className="photo-stack">
                    {selectedPlace.photos.map((photo, index) => (
                      <div 
                        key={index}
                        // 也可以给图片加上 staggered 动画，这里简单处理
                        className="photo-block"
                        onClick={() => {
                          setCurrentPhotoIndex(index); 
                          setIsLightboxOpen(true);     
                        }}
                      >
                        <img src={photo} alt={`${selectedPlace.name} ${index}`} loading="lazy" />
                        <div className="click-hint">Click to expand</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // 增加 key="achievements" 确保切换回 Overview 时也有动画
              <div className="achievements-panel sidebar-enter-anim anim-delay-2" key="achievements-panel">
                <div className="achievements-header">
                  <Trophy size={18} className="trophy-icon"/>
                  <h3>Exploration Status</h3>
                </div>
                <div className="achievements-grid">
                  {/* 进度圈组件内部已经有动画类了，所以这里不用加 */}
                  <ProgressRing label="Countries" current={stats.uniqueCountries} total={233} delay={0.1} />
                  <ProgressRing label="Continents" current={stats.uniqueContinents} total={7} delay={0.2} />
                </div>
                <p className="hint-text">"The world is a book and those who do not travel read only one page."</p>
              </div>
            )}
          </div>
        </div>
        <div className="sidebar-footer"><p>© 2025 JR Travel</p></div>
      </div>

      {isLightboxOpen && selectedPlace && (
        <div className="lightbox-overlay sidebar-enter-anim" onClick={() => setIsLightboxOpen(false)}>
          <button className="lightbox-close"><X size={32} color="white" /></button>
          {selectedPlace.photos.length > 1 && ( <button className="lightbox-nav prev" onClick={prevPhoto}><ChevronLeft size={48} /></button> )}
          <img src={selectedPlace.photos[currentPhotoIndex]} alt="Full screen" onClick={(e) => e.stopPropagation()} />
          {selectedPlace.photos.length > 1 && ( <button className="lightbox-nav next" onClick={nextPhoto}><ChevronRight size={48} /></button> )}
          <div className="lightbox-counter">{currentPhotoIndex + 1} / {selectedPlace.photos.length}</div>
        </div>
      )}
    </div>,
    document.body 
  );
};

export default TravelGlobe;