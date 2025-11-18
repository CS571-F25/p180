import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import TargetCursor from './TargetCursor';
import GameCard from './GameCard';
import GameDetailSidebar from './GameDetailSidebar';
import { gamesData } from '../data/gamesData';
import './GamingMasonry.css';

const GamingShowcase = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 处理卡片点击
  const handleCardClick = (game) => {
    setSelectedGame(game);
    setIsSidebarOpen(true);
  };

  // 关闭侧边栏
  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedGame(null), 300);
  };

  // 瀑布流断点配置
  const breakpointColumns = {
    default: 4,  // 默认4列
    1536: 3,     // 2xl屏幕3列
    1024: 3,     // lg屏幕3列
    768: 2,      // md屏幕2列
    640: 1       // sm屏幕1列
  };

  return (
    <section id="gaming" className="section gaming-section">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* 标题区域 */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gaming Showcase
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            我的游戏收藏 - 记录每一段精彩的冒险旅程
          </p>
        </motion.div>

        {/* 瀑布流布局 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {gamesData.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <GameCard
                  game={game}
                  onClick={() => handleCardClick(game)}
                />
              </motion.div>
            ))}
          </Masonry>
        </motion.div>

        {/* 统计信息 */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            游戏统计
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {gamesData.length}
              </div>
              <div className="text-sm text-gray-600">游戏总数</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {Math.round(
                  gamesData.reduce((sum, game) => sum + game.hours, 0)
                )}
              </div>
              <div className="text-sm text-gray-600">总游戏时长</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {Math.round(
                  gamesData.reduce((sum, game) => sum + game.achievement, 0) /
                    gamesData.length
                )}
                %
              </div>
              <div className="text-sm text-gray-600">平均成就</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-600 mb-2">
                {(
                  gamesData.reduce((sum, game) => sum + game.rating, 0) /
                  gamesData.length
                ).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">平均评分</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 详情侧边栏 */}
      <GameDetailSidebar
        game={selectedGame}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </section>
  );
};

export default GamingShowcase;
