import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Trophy } from 'lucide-react';
import ProgressCircle from './ProgressCircle';
import RatingStars from './RatingStars';

/**
 * 游戏详情侧边栏组件
 */
const GameDetailSidebar = ({ game, isOpen, onClose }) => {
  if (!game) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 侧边栏 */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full md:w-[500px] bg-white z-50
                       shadow-2xl overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100
                         hover:bg-gray-200 transition-colors z-10"
            >
              <X size={24} className="text-gray-700" />
            </button>

            {/* 大图 */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={game.cover}
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-white text-2xl font-bold mb-2">
                  {game.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {game.platform}
                  </span>
                </div>
              </div>
            </div>

            {/* 详情内容 */}
            <div className="p-6 space-y-6">
              {/* 核心数据大卡片 */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="grid grid-cols-3 gap-4">
                  {/* 游戏时长 */}
                  <div className="flex flex-col items-center">
                    <Clock size={24} className="text-blue-600 mb-2" />
                    <span className="text-2xl font-bold text-gray-800">
                      {game.hours}
                    </span>
                    <span className="text-xs text-gray-600">小时</span>
                  </div>

                  {/* 成就进度 */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium text-gray-600 mb-2">
                      成就进度
                    </span>
                    <ProgressCircle
                      percentage={game.achievement}
                      size={70}
                      strokeWidth={7}
                    />
                  </div>

                  {/* 我的评分 */}
                  <div className="flex flex-col items-center justify-center">
                    <Trophy size={24} className="text-yellow-500 mb-2" />
                    <RatingStars rating={game.rating} starSize={18} />
                  </div>
                </div>
              </div>

              {/* 游戏标签 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  游戏类型
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500
                                 text-white text-sm rounded-full font-medium
                                 shadow-md hover:shadow-lg transition-shadow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 游戏简评 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  简短评价
                </h3>
                <p className="text-gray-700 italic bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  "{game.shortReview}"
                </p>
              </div>

              {/* 完整评价 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  详细评价
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {game.fullReview}
                </p>
              </div>

              {/* 成就详细进度 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  我的成就
                </h3>
                <div className="space-y-2">
                  {game.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg
                                 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full
                                      flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 游戏描述 */}
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="text-blue-600" size={20} />
                  <h3 className="text-lg font-semibold text-gray-800">
                    游戏信息
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">平台</span>
                    <span className="font-medium text-gray-800">{game.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">游戏时长</span>
                    <span className="font-medium text-gray-800">{game.hours} 小时</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">成就完成度</span>
                    <span className="font-medium text-gray-800">{game.achievement}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">个人评分</span>
                    <span className="font-medium text-gray-800">{game.rating}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GameDetailSidebar;
