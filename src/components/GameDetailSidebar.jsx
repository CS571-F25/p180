import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Award, CheckCircle, Circle } from 'lucide-react';
import ProgressCircle from './ProgressCircle';
import RatingStars from './RatingStars';

const GameDetailSidebar = ({ game, isOpen, onClose }) => {
  if (!game) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
            }}
          />

          {/* 侧边栏 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '90%',
              maxWidth: '600px',
              backgroundColor: 'rgba(20, 20, 30, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
              zIndex: 1000,
              overflowY: 'auto',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <X size={20} />
            </button>

            {/* 大图 */}
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', overflow: 'hidden' }}>
              <img
                src={game.cover}
                alt={game.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(20, 20, 30, 1), transparent)',
                }}
              />
            </div>

            {/* 内容区 */}
            <div style={{ padding: '2rem' }}>
              {/* 标题 */}
              <h2
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#fff',
                  marginBottom: '1rem',
                  lineHeight: '1.2',
                }}
              >
                {game.title}
              </h2>

              {/* 标签 */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {game.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: '0.875rem',
                      padding: '0.375rem 0.875rem',
                      backgroundColor: 'rgba(59, 130, 246, 0.2)',
                      color: '#60A5FA',
                      borderRadius: '9999px',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
                <span
                  style={{
                    fontSize: '0.875rem',
                    padding: '0.375rem 0.875rem',
                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                    color: '#A78BFA',
                    borderRadius: '9999px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                  }}
                >
                  {game.platform}
                </span>
              </div>

              {/* 核心数据 */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Clock size={18} color="#3B82F6" />
                    <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>游戏时长</span>
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3B82F6' }}>
                    {game.hours} h
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '0.5rem' }}>成就完成度</div>
                  <ProgressCircle percentage={game.achievement} size={70} strokeWidth={5} />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Award size={18} color="#F59E0B" />
                    <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.6)' }}>我的评分</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.5rem' }}>
                    <RatingStars rating={game.rating} size={18} showNumber={true} />
                  </div>
                </div>
              </div>

              {/* 游戏描述 */}
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#fff',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  游戏简介
                </h3>
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.7',
                  }}
                >
                  {game.description}
                </p>
              </div>

              {/* 我的完整评价 */}
              <div style={{ marginBottom: '2rem' }}>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#fff',
                    marginBottom: '0.75rem',
                  }}
                >
                  我的评价
                </h3>
                <div
                  style={{
                    padding: '1.25rem',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderLeft: '4px solid #3B82F6',
                    borderRadius: '0.5rem',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: '1.7',
                      fontStyle: 'italic',
                    }}
                  >
                    {game.fullReview || game.shortReview}
                  </p>
                </div>
              </div>

              {/* 成就详细进度 */}
              {game.achievements && game.achievements.length > 0 && (
                <div>
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#fff',
                      marginBottom: '0.75rem',
                    }}
                  >
                    成就进度
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {game.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.875rem',
                          backgroundColor: achievement.completed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                          borderRadius: '0.5rem',
                          border: `1px solid ${achievement.completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                        }}
                      >
                        {achievement.completed ? (
                          <CheckCircle size={20} color="#10B981" />
                        ) : (
                          <Circle size={20} color="rgba(255, 255, 255, 0.3)" />
                        )}
                        <span
                          style={{
                            fontSize: '0.9375rem',
                            color: achievement.completed ? '#10B981' : 'rgba(255, 255, 255, 0.7)',
                          }}
                        >
                          {achievement.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameDetailSidebar;
