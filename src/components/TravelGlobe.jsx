import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Globe from 'react-globe.gl';
import { X, Calendar, MapPin as MapPinIcon } from 'lucide-react';

const TravelGlobe = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [globeReady, setGlobeReady] = useState(false);
  const globeEl = useRef();
  const autoRotateRef = useRef(true);

  // Travel locations data
  const locations = [
    {
      id: 1,
      name: 'Beijing, China',
      lat: 39.9042,
      lng: 116.4074,
      visitDate: '2023-08-15',
      description: 'My hometown and where I spent my undergraduate years.',
      img: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&h=600&fit=crop',
          caption: 'The magnificent Forbidden City'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&h=600&fit=crop',
          caption: 'Great Wall at Mutianyu'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1570797197190-8e003a00c846?w=800&h=600&fit=crop',
          caption: 'Traditional hutong architecture'
        },
        {
          id: 4,
          url: 'https://images.unsplash.com/photo-1551655510-34fde1bad8fc?w=800&h=600&fit=crop',
          caption: 'Temple of Heaven'
        }
      ]
    },
    {
      id: 2,
      name: 'Madison, Wisconsin',
      lat: 43.0731,
      lng: -89.4012,
      visitDate: '2023-09-01',
      description: 'Currently pursuing my Master\'s degree here.',
      img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
          caption: 'Beautiful sunset over Lake Mendota'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
          caption: 'Wisconsin State Capitol'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
          caption: 'Campus at UW-Madison'
        }
      ]
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      lat: 35.6895,
      lng: 139.6917,
      visitDate: '2022-12-20',
      description: 'Experience the perfect blend of tradition and modernity.',
      img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
          caption: 'Shibuya Crossing at night'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&h=600&fit=crop',
          caption: 'Mount Fuji view'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800&h=600&fit=crop',
          caption: 'Traditional temple in Asakusa'
        }
      ]
    },
    {
      id: 4,
      name: 'Paris, France',
      lat: 48.8566,
      lng: 2.3522,
      visitDate: '2023-06-10',
      description: 'The city of lights and endless romance.',
      img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
          caption: 'Eiffel Tower at sunset'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&h=600&fit=crop',
          caption: 'The Louvre Museum'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=600&fit=crop',
          caption: 'Seine River cruise'
        }
      ]
    },
    {
      id: 5,
      name: 'New York City, USA',
      lat: 40.7128,
      lng: -74.0060,
      visitDate: '2023-03-15',
      description: 'The city that never sleeps.',
      img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
          caption: 'Manhattan skyline'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=600&fit=crop',
          caption: 'Times Square at night'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800&h=600&fit=crop',
          caption: 'Brooklyn Bridge'
        }
      ]
    },
    {
      id: 6,
      name: 'Sydney, Australia',
      lat: -33.8688,
      lng: 151.2093,
      visitDate: '2023-01-20',
      description: 'Beautiful harbor city with iconic landmarks.',
      img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
      photos: [
        {
          id: 1,
          url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
          caption: 'Sydney Opera House'
        },
        {
          id: 2,
          url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop',
          caption: 'Sydney Harbour Bridge'
        },
        {
          id: 3,
          url: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
          caption: 'Bondi Beach'
        }
      ]
    }
  ];

  // Initialize globe and set up auto-rotation
  useEffect(() => {
    if (globeEl.current) {
      const globe = globeEl.current;

      // Set initial view
      globe.pointOfView({ altitude: 2.5 }, 0);

      // Set up controls
      const controls = globe.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = true;
      controls.minDistance = 200;
      controls.maxDistance = 600;

      setGlobeReady(true);

      // Stop auto-rotation when user interacts
      const handleInteraction = () => {
        if (autoRotateRef.current) {
          controls.autoRotate = false;
          autoRotateRef.current = false;
        }
      };

      // Add interaction listeners
      const canvas = globe.scene().canvas;
      canvas.addEventListener('mousedown', handleInteraction);
      canvas.addEventListener('touchstart', handleInteraction);
      canvas.addEventListener('wheel', handleInteraction);

      return () => {
        canvas.removeEventListener('mousedown', handleInteraction);
        canvas.removeEventListener('touchstart', handleInteraction);
        canvas.removeEventListener('wheel', handleInteraction);
      };
    }
  }, []);

  // Handle marker click
  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (globeEl.current) {
      // Smoothly move camera to location
      globeEl.current.pointOfView({
        lat: location.lat,
        lng: location.lng,
        altitude: 2
      }, 1000);
    }
  };

  // Custom marker HTML
  const markerHtml = (location) => {
    return `
      <div style="
        width: 20px;
        height: 20px;
        background: #ff6b35;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(255, 107, 53, 0.5);
        cursor: pointer;
        transition: transform 0.2s;
      "
      onmouseover="this.style.transform='scale(1.3)'"
      onmouseout="this.style.transform='scale(1)'"
      ></div>
    `;
  };

  return (
    <section id="travel" className="section travel-section-new">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Travel Globe
        </motion.h2>

        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          探索世界的足迹 - 点击地球上的标记查看照片
        </motion.p>
      </div>

      {/* Globe container */}
      <motion.div
        className="globe-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Globe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

          // Custom markers
          htmlElementsData={locations}
          htmlElement={(d) => {
            const el = document.createElement('div');
            el.innerHTML = markerHtml(d);
            el.style.cursor = 'pointer';
            el.onclick = () => handleMarkerClick(d);
            return el;
          }}
          htmlLat={d => d.lat}
          htmlLng={d => d.lng}
          htmlAltitude={0.01}

          // Styling
          atmosphereColor="#ff6b35"
          atmosphereAltitude={0.15}

          // Performance
          animateIn={true}
          waitForGlobeReady={true}
        />
      </motion.div>

      {/* Photo modal popup */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="travel-photo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLocation(null)}
          >
            <motion.div
              className="modal-content travel-modal-content"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedLocation(null)}
              >
                <X size={24} />
              </button>

              <div className="travel-modal-header">
                <h2>
                  <MapPinIcon size={24} style={{ display: 'inline', marginRight: '8px' }} />
                  {selectedLocation.name}
                </h2>
                <div className="travel-modal-meta">
                  <Calendar size={16} />
                  <span>{selectedLocation.visitDate}</span>
                </div>
                <p>{selectedLocation.description}</p>
              </div>

              <div className="travel-photo-grid">
                {selectedLocation.photos.map((photo) => (
                  <motion.div
                    key={photo.id}
                    className="travel-photo-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: photo.id * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img src={photo.url} alt={photo.caption} />
                    <div className="travel-photo-caption">
                      {photo.caption}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TravelGlobe;
