import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import transitionConfig, { getEasing, getOverlayBackground, getSlideValues } from '../config/transitionConfig';
import './PageTransition.css';

/**
 * PageTransition 组件
 * 实现白色遮罩层的页面转场效果
 *
 * 转场流程：
 * 1. 遮罩层从右侧滑入，完全覆盖屏幕
 * 2. 在遮罩层后方替换页面内容
 * 3. 遮罩层向左侧滑出，露出新页面
 */
const PageTransition = ({ children, pageKey, direction = 1, onTransitionStart, onTransitionComplete }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // 从配置中获取参数
  const { timing, overlay, debug, performance } = transitionConfig;
  const easing = getEasing();
  const overlayBackground = getOverlayBackground();
  const slideInValues = getSlideValues('slideIn');
  const slideOutValues = getSlideValues('slideOut');

  // 监听 pageKey 变化，触发转场动画
  useEffect(() => {
    if (pageKey !== undefined) {
      startTransition();
    }
  }, [pageKey]);

  const startTransition = () => {
    setIsTransitioning(true);
    setShowOverlay(true);

    if (debug.enabled) {
      console.log('🎬 Page transition started');
      if (debug.showTimings) {
        console.time('Transition Duration');
      }
    }

    if (onTransitionStart) {
      onTransitionStart();
    }

    // 遮罩层完全覆盖后，触发内容切换
    const slideInDuration = timing.slideIn * 1000; // 转换为毫秒

    setTimeout(() => {
      // 内容在这里被 React 自动替换
      if (debug.enabled) {
        console.log('📄 Content swapping');
      }

      // 再等待一小段时间后开始滑出遮罩层
      setTimeout(() => {
        setShowOverlay(false);

        if (debug.enabled) {
          console.log('✅ Page transition completed');
          if (debug.showTimings) {
            console.timeEnd('Transition Duration');
          }
        }

        if (onTransitionComplete) {
          onTransitionComplete();
        }
      }, 100);
    }, slideInDuration);
  };

  // 遮罩层动画配置
  const overlayVariants = {
    // 初始状态：在屏幕外部
    initial: {
      [slideInValues.axis]: slideInValues.initial,
    },
    // 滑入：覆盖整个屏幕
    slideIn: {
      [slideInValues.axis]: 0,
      transition: {
        duration: timing.slideIn,
        ease: easing,
      }
    },
    // 滑出：离开屏幕
    slideOut: {
      [slideOutValues.axis]: slideOutValues.final,
      transition: {
        duration: timing.slideOut,
        ease: easing,
      }
    }
  };

  // 内容淡入淡出动画
  const contentVariants = {
    hidden: {
      opacity: transitionConfig.content.fadeEffect ? 0 : 1,
      scale: transitionConfig.content.scaleEffect ? transitionConfig.content.scaleAmount : 1,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: timing.contentFade,
        delay: timing.contentDelay,
      }
    }
  };

  return (
    <div className="page-transition-container">
      {/* 页面内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pageKey}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="page-content"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* 禁用交互的遮罩（转场期间） */}
      {performance.disableInteraction && isTransitioning && (
        <div
          className="interaction-blocker"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9998,
            cursor: 'wait',
            pointerEvents: 'all',
          }}
        />
      )}

      {/* 转场遮罩层 */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="transition-overlay"
            style={{
              background: overlayBackground,
              opacity: overlay.opacity,
              backdropFilter: overlay.backdropFilter,
              willChange: performance.useGPU ? 'transform' : 'auto',
            }}
            variants={overlayVariants}
            initial="initial"
            animate="slideIn"
            exit="slideOut"
            onAnimationComplete={(definition) => {
              // 当滑出动画完成时，重置转场状态
              if (definition === 'slideOut') {
                setIsTransitioning(false);
              }
            }}
          >
            {/* 可选的加载动画 */}
            {overlay.showLoader && (
              <div className="transition-loader">
                <div
                  className="loader-spinner"
                  style={{ borderTopColor: overlay.loaderColor }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;
