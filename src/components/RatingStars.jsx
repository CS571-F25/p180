import React from 'react';
import { Star } from 'lucide-react';

/**
 * 星级评分组件
 * @param {number} rating - 评分 (0-10)
 * @param {boolean} showNumber - 是否显示数字，默认true
 * @param {number} starSize - 星星大小，默认16
 */
const RatingStars = ({
  rating = 0,
  showNumber = true,
  starSize = 16
}) => {
  // 将0-10的评分转换为0-5星
  const stars = rating / 2;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {/* 满星 */}
        {[...Array(fullStars)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={starSize}
            fill="#FCD34D"
            stroke="#FCD34D"
            className="text-yellow-400"
          />
        ))}

        {/* 半星 */}
        {hasHalfStar && (
          <div className="relative">
            <Star
              size={starSize}
              fill="none"
              stroke="#E5E7EB"
              className="text-gray-300"
            />
            <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
              <Star
                size={starSize}
                fill="#FCD34D"
                stroke="#FCD34D"
                className="text-yellow-400"
              />
            </div>
          </div>
        )}

        {/* 空星 */}
        {[...Array(emptyStars)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={starSize}
            fill="none"
            stroke="#E5E7EB"
            className="text-gray-300"
          />
        ))}
      </div>

      {/* 显示数字评分 */}
      {showNumber && (
        <span className="text-sm font-semibold text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
