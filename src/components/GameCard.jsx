import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import ProgressCircle from './ProgressCircle';
import RatingStars from './RatingStars';
import TiltedCard from './TiltedCard';

/**
 * 游戏卡片组件
 */
const GameCard = ({ game, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl
                 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* 封面图 - 使用 TiltedCard */}
      <div className="relative w-full h-48 bg-gray-100">
        <TiltedCard
          imageSrc={game.cover}
          altText={game.title}
          captionText={game.title}
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          scaleOnHover={1.05}
          rotateAmplitude={8}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <h3 className="text-white font-bold text-lg line-clamp-2 drop-shadow-lg">
                {game.title}
              </h3>
            </div>
          }
        />
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
