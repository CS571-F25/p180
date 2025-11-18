import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import ProgressCircle from './ProgressCircle';
import RatingStars from './RatingStars';

/**
 * 游戏卡片组件
 */
const GameCard = ({ game, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl
                 transition-all duration-300 cursor-pointer group"
      whileHover={{ scale: 1.03 }}
      onClick={onClick}
    >
      {/* 封面图 */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={game.cover}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300
                     group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* 游戏标题覆盖在图片上 */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg line-clamp-2">
            {game.title}
          </h3>
        </div>
      </div>

      {/* 核心数据区 */}
      <div className="p-4">
        {/* 三项核心数据 */}
        <div className="flex items-center justify-between mb-4 gap-4">
          {/* 时长 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-gray-600 mb-1">
              <Clock size={14} />
              <span className="text-xs font-medium">时长</span>
            </div>
            <span className="text-sm font-bold text-gray-800">
              {game.hours} h
            </span>
          </div>

          {/* 成就进度 */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-gray-600 mb-1">成就</span>
            <ProgressCircle
              percentage={game.achievement}
              size={50}
              strokeWidth={5}
            />
          </div>

          {/* 评分 */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-medium text-gray-600 mb-1">评分</span>
            <RatingStars rating={game.rating} starSize={14} />
          </div>
        </div>

        {/* 简短评价 */}
        <div className="mb-3">
          <p className="text-sm text-gray-600 italic line-clamp-2">
            "{game.shortReview}"
          </p>
        </div>

        {/* 标签和平台 */}
        <div className="space-y-2">
          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5">
            {game.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs
                           rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 平台 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">平台: {game.platform}</span>
            <span className="text-xs text-blue-600 font-medium hover:underline">
              查看详情 →
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
