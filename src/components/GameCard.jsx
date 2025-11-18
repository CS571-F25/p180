import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Award } from 'lucide-react';
import ProgressCircle from './ProgressCircle';
import RatingStars from './RatingStars';

const GameCard = ({ game, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      className="game-card-masonry"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(game)}
      style={{
        backgroundColor: 'rgba(30, 30, 40, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '1rem',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* 封面图 */}
      <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', overflow: 'hidden' }}>
        {!imageLoaded && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ color: 'rgba(255, 255, 255, 0.3)', fontSize: '0.875rem' }}>Loading...</div>
          </div>
        )}
        <img
          src={game.cover}
          alt={game.title}
          onLoad={() => setImageLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        {/* 渐变遮罩 */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
          }}
        />
      </div>

      {/* 游戏信息 */}
      <div style={{ padding: '1rem' }}>
        {/* 游戏标题 */}
        <h3
          style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '0.5rem',
            lineHeight: '1.4',
          }}
        >
          {game.title}
        </h3>

        {/* 核心数据区 - 三项横排 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginBottom: '1rem',
            padding: '0.75rem',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: '0.5rem',
          }}
        >
          {/* 时长 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
              <Clock size={14} color="#3B82F6" />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>时长</span>
            </div>
            <div style={{ fontSize: '1rem', fontWeight: '700', color: '#3B82F6' }}>
              {game.hours} h
            </div>
          </div>

          {/* 成就完成度 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.25rem' }}>成就</div>
            <ProgressCircle percentage={game.achievement} size={50} strokeWidth={4} />
          </div>

          {/* 评分 */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
              <Award size={14} color="#F59E0B" />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>评分</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <RatingStars rating={game.rating} size={14} showNumber={true} />
            </div>
          </div>
        </div>

        {/* 游戏标签 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
          {game.tags.map((tag, index) => (
            <span
              key={index}
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.625rem',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#60A5FA',
                borderRadius: '9999px',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 简短评价 */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: '1.5',
            marginBottom: '0.75rem',
          }}
        >
          {game.shortReview}
        </p>

        {/* 平台 */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            fontSize: '0.75rem',
            padding: '0.375rem 0.75rem',
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            color: '#A78BFA',
            borderRadius: '0.375rem',
            border: '1px solid rgba(139, 92, 246, 0.3)',
          }}
        >
          <span style={{ fontSize: '1rem' }}>🎮</span>
          {game.platform}
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
