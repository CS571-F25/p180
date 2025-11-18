import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const RatingStars = ({ rating, maxRating = 10, showNumber = true, size = 16 }) => {
  // 将评分转换为5星制
  const starRating = (rating / maxRating) * 5;
  const fullStars = Math.floor(starRating);
  const hasHalfStar = starRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // 根据评分设置颜色
  const getColor = (rating) => {
    if (rating >= 9) return '#10B981'; // 绿色 - 杰作
    if (rating >= 8) return '#3B82F6'; // 蓝色 - 优秀
    if (rating >= 7) return '#F59E0B'; // 橙色 - 良好
    if (rating >= 6) return '#EF4444'; // 红色 - 一般
    return '#6B7280'; // 灰色 - 较差
  };

  const color = getColor(rating);

  return (
    <div className="rating-stars" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ display: 'flex', gap: '0.125rem' }}>
        {/* 满星 */}
        {[...Array(fullStars)].map((_, i) => (
          <motion.div
            key={`full-${i}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            <Star size={size} fill={color} stroke={color} />
          </motion.div>
        ))}
        {/* 半星 */}
        {hasHalfStar && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: fullStars * 0.05, duration: 0.3 }}
            style={{ position: 'relative' }}
          >
            <Star size={size} stroke={color} fill="none" />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                overflow: 'hidden',
              }}
            >
              <Star size={size} fill={color} stroke={color} />
            </div>
          </motion.div>
        )}
        {/* 空星 */}
        {[...Array(emptyStars)].map((_, i) => (
          <motion.div
            key={`empty-${i}`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: (fullStars + (hasHalfStar ? 1 : 0) + i) * 0.05, duration: 0.3 }}
          >
            <Star size={size} stroke="#6B7280" fill="none" />
          </motion.div>
        ))}
      </div>
      {/* 数值显示 */}
      {showNumber && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: size > 16 ? '0.875rem' : '0.75rem',
            fontWeight: '600',
            color: color,
          }}
        >
          {rating.toFixed(1)}
        </motion.span>
      )}
    </div>
  );
};

export default RatingStars;
