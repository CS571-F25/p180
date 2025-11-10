/**
 * 页面转场效果配置文件
 *
 * 在这里修改配置即可自定义转场效果，无需修改组件代码
 */

export const transitionConfig = {
  // 动画时长（单位：秒）
  timing: {
    slideIn: 0.5,      // 遮罩层滑入时长
    slideOut: 0.5,     // 遮罩层滑出时长
    contentFade: 0.3,  // 内容淡入时长
    contentDelay: 0.2, // 内容淡入延迟
  },

  // 缓动函数（Easing）
  // 预设: 'linear', 'easeIn', 'easeOut', 'easeInOut', 'smooth'
  easing: {
    type: 'custom',
    // 自定义缓动曲线 [x1, y1, x2, y2] (贝塞尔曲线)
    custom: [0.76, 0, 0.24, 1], // 默认为平滑的缓动

    // 预设缓动函数
    presets: {
      linear: [0, 0, 1, 1],
      easeIn: [0.4, 0, 1, 1],
      easeOut: [0, 0, 0.2, 1],
      easeInOut: [0.4, 0, 0.2, 1],
      smooth: [0.76, 0, 0.24, 1],
      snappy: [0.87, 0, 0.13, 1],
    }
  },

  // 遮罩层样式
  overlay: {
    // 背景颜色
    // 可选: 纯色 '#ffffff', 渐变 'linear-gradient(...)', 或预设
    backgroundColor: 'white', // 'white', 'brand', 'dark', 'gradient'

    // 预设颜色
    colors: {
      white: '#ffffff',
      brand: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      dark: '#1d1d1f',
      gradient: 'linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.95) 100%)',
    },

    // 不透明度 (0-1)
    opacity: 1,

    // 模糊效果（可选）
    backdropFilter: 'none', // 'blur(10px)', 'none'

    // 显示加载动画
    showLoader: false,
    loaderColor: '#ff6b35',
  },

  // 滑动方向
  direction: {
    // 滑入方向: 'right' (从右), 'left' (从左), 'top' (从上), 'bottom' (从下)
    slideInFrom: 'right',

    // 滑出方向: 'left', 'right', 'top', 'bottom', 'same' (与滑入同方向)
    slideOutTo: 'left',
  },

  // 内容动画
  content: {
    // 内容淡入淡出效果
    fadeEffect: true,

    // 内容缩放效果
    scaleEffect: false,
    scaleAmount: 0.95, // 0.9 = 缩小到 90%
  },

  // 性能优化
  performance: {
    // 启用 GPU 加速
    useGPU: true,

    // 在转场期间禁用用户交互
    disableInteraction: true,
  },

  // 调试模式
  debug: {
    // 显示转场日志
    enabled: false,

    // 显示时间标记
    showTimings: false,
  }
};

/**
 * 获取缓动函数
 */
export const getEasing = () => {
  const { type, custom, presets } = transitionConfig.easing;

  if (type === 'custom') {
    return custom;
  }

  return presets[type] || presets.smooth;
};

/**
 * 获取遮罩层背景色
 */
export const getOverlayBackground = () => {
  const { backgroundColor, colors } = transitionConfig.overlay;

  // 如果是预设颜色名称，返回预设值
  if (colors[backgroundColor]) {
    return colors[backgroundColor];
  }

  // 否则直接返回自定义颜色
  return backgroundColor;
};

/**
 * 获取滑动方向的位移值
 */
export const getSlideValues = (phase) => {
  const { slideInFrom, slideOutTo } = transitionConfig.direction;

  const directionMap = {
    right: { axis: 'x', initial: '100%', final: '-100%' },
    left: { axis: 'x', initial: '-100%', final: '100%' },
    top: { axis: 'y', initial: '-100%', final: '100%' },
    bottom: { axis: 'y', initial: '100%', final: '-100%' },
  };

  if (phase === 'slideIn') {
    return directionMap[slideInFrom];
  }

  const slideOut = slideOutTo === 'same' ? slideInFrom : slideOutTo;
  return directionMap[slideOut];
};

export default transitionConfig;
