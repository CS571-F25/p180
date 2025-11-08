// Gallery metadata mapped by Cloudinary public_id
// This file contains content metadata (title, description, etc.) for images
// The key must match the public_id from Cloudinary

export const galleryMetadata = {
  // Photos metadata
  'gallery/mountain-sunrise': {
    title: 'Mountain Sunrise',
    description: 'Captured during a hiking trip in the Swiss Alps.',
    location: 'Swiss Alps',
    date: '2024-03-15',
    likes: 1247,
    views: 3542,
    type: 'photo'
  },
  'gallery/urban-portrait': {
    title: 'Urban Portrait',
    description: 'Street photography session in downtown Chicago.',
    location: 'Chicago, USA',
    date: '2024-02-20',
    likes: 892,
    views: 2341,
    type: 'photo'
  },
  'gallery/ocean-waves': {
    title: 'Ocean Waves',
    description: 'Long exposure of waves crashing against the rocky shore.',
    location: 'Big Sur, California',
    date: '2024-01-10',
    likes: 1563,
    views: 4123,
    type: 'photo'
  },
  'gallery/city-lights': {
    title: 'City Lights',
    description: 'Night photography from rooftop in Manhattan.',
    location: 'New York, USA',
    date: '2023-12-05',
    likes: 2103,
    views: 5234,
    type: 'photo'
  },
  'gallery/wildlife-closeup': {
    title: 'Wildlife Close-up',
    description: 'Macro photography of a butterfly in botanical garden.',
    location: 'Local Botanical Garden',
    date: '2023-11-18',
    likes: 743,
    views: 1876,
    type: 'photo'
  },
  'gallery/architectural-detail': {
    title: 'Architectural Detail',
    description: 'Modern architecture photography focusing on patterns.',
    location: 'Dubai, UAE',
    date: '2023-10-22',
    likes: 945,
    views: 2654,
    type: 'photo'
  }
};

// Videos metadata
export const videoMetadata = {
  'videos/japan-vlog': {
    title: 'Travel Vlog: Japan 2024',
    description: '探索日本的美食和文化，从东京到京都的旅程记录。',
    location: 'Japan',
    date: '2024-04-10',
    likes: 3456,
    views: 12543,
    duration: '15:32',
    type: 'video'
  },
  'videos/gaming-highlights': {
    title: 'Gaming Highlights: Epic Moments',
    description: '本月最精彩的游戏时刻合集，包括多个惊险击杀。',
    location: 'Online',
    date: '2024-03-28',
    likes: 2134,
    views: 8765,
    duration: '8:45',
    type: 'video'
  },
  'videos/photography-tutorial': {
    title: 'Photography Tutorial: Golden Hour',
    description: '如何在黄金时段拍摄出令人惊艳的照片。',
    location: 'Various',
    date: '2024-03-15',
    likes: 1876,
    views: 6543,
    duration: '12:18',
    type: 'video'
  },
  'videos/nyc-timelapse': {
    title: 'City Life: New York Timelapse',
    description: '纽约城市生活的延时摄影，展现都市的活力。',
    location: 'New York, USA',
    date: '2024-02-20',
    likes: 4321,
    views: 15234,
    duration: '3:24',
    type: 'video'
  },
  'videos/mountain-drone': {
    title: 'Drone Footage: Mountain Adventure',
    description: '航拍视角下的山间探险，壮丽的自然风光。',
    location: 'Rocky Mountains',
    date: '2024-01-30',
    likes: 2987,
    views: 9876,
    duration: '6:55',
    type: 'video'
  },
  'videos/photo-shoot-bts': {
    title: 'Behind the Scenes: Photo Shoot',
    description: '专业摄影拍摄的幕后花絮，分享拍摄技巧。',
    location: 'Studio',
    date: '2024-01-15',
    likes: 1654,
    views: 5432,
    duration: '10:12',
    type: 'video'
  }
};

// Helper function to get metadata by public_id
export const getMetadata = (publicId, type = 'photo') => {
  const metadata = type === 'video' ? videoMetadata : galleryMetadata;
  return metadata[publicId] || null;
};

// Helper function to merge Cloudinary data with metadata
export const mergeCloudinaryData = (cloudinaryResources, metadataMap) => {
  return cloudinaryResources.map(resource => {
    const metadata = metadataMap[resource.public_id] || {};
    return {
      ...resource,
      ...metadata,
      // Ensure we have these fields for react-photo-album
      src: `https://res.cloudinary.com/dbpu6htkt/image/upload/v${resource.version}/${resource.public_id}.${resource.format}`,
      width: resource.width,
      height: resource.height,
      // Optimized thumbnail URL with Cloudinary transformations
      thumbnail: `https://res.cloudinary.com/dbpu6htkt/image/upload/w_800,q_auto,f_auto/v${resource.version}/${resource.public_id}.${resource.format}`,
    };
  });
};
