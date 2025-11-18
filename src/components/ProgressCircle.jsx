import React from 'react';

/**
 * 环形进度条组件
 * @param {number} percentage - 进度百分比 (0-100)
 * @param {number} size - 圆环大小，默认60
 * @param {number} strokeWidth - 线条宽度，默认6
 * @param {string} color - 进度条颜色，默认'#10B981'
 */
const ProgressCircle = ({
  percentage = 0,
  size = 60,
  strokeWidth = 6,
  color = '#10B981'
}) => {
  // 计算圆环参数
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* 背景圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        {/* 进度圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {/* 中间显示百分比 */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-semibold" style={{ color }}>
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
