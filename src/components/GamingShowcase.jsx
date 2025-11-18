import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import TargetCursor from './TargetCursor';
import GameCard from './GameCard';
import GameDetailSidebar from './GameDetailSidebar';
import gamesData from '../data/gamesData';
import './GamingShowcaseMasonry.css';

const GamingShowcase = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCardClick = (game) => {
    setSelectedGame(game);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    // 延迟清除选中的游戏，等待侧边栏关闭动画完成
    setTimeout(() => setSelectedGame(null), 300);
  };

  // 瀑布流断点配置
  const breakpointColumns = {
    default: 4,  // 大屏幕 4 列
    1536: 3,     // 2xl: 3 列
    1024: 3,     // lg: 3 列
    768: 2,      // md: 2 列
    640: 1       // sm: 1 列
  };

  return (
    <section id="gaming" className="gaming-section-masonry">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      <div className="gaming-container-masonry">
        {/* 标题区域 */}
        <motion.div
          className="gaming-header-masonry"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="gaming-title-masonry">
            游戏展示
          </h2>
          <p className="gaming-subtitle-masonry">
            我的个人游戏收藏 - 记录每一次冒险与感动
          </p>
        </motion.div>

        {/* 瀑布流游戏卡片 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {gamesData.map((game, index) => (
              <div key={game.id}>
                <GameCard
                  game={game}
                  onClick={handleCardClick}
                />
              </div>
            ))}
          </Masonry>
        </motion.div>

        {/* 游戏统计 */}
        <motion.div
          className="gaming-stats-masonry"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="stats-title">游戏统计</h3>
          <div className="stats-grid-masonry">
            <div className="stat-item-masonry">
              <div className="stat-number">800+</div>
              <div className="stat-label">总游戏时长</div>
            </div>
            <div className="stat-item-masonry">
              <div className="stat-number">{gamesData.length}</div>
              <div className="stat-label">游戏收藏</div>
            </div>
            <div className="stat-item-masonry">
              <div className="stat-number">
                {Math.round(gamesData.reduce((sum, game) => sum + game.achievement, 0) / gamesData.length)}%
              </div>
              <div className="stat-label">平均成就</div>
            </div>
            <div className="stat-item-masonry">
              <div className="stat-number">
                {(gamesData.reduce((sum, game) => sum + game.rating, 0) / gamesData.length).toFixed(1)}
              </div>
              <div className="stat-label">平均评分</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 游戏详情侧边栏 */}
      <GameDetailSidebar
        game={selectedGame}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </section>
  );
};

export default GamingShowcase;
