import React from 'react';
import { motion } from 'framer-motion';

const ProgressCircle = ({ percentage, size = 60, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // 根据完成度设置颜色
  const getColor = (percent) => {
    if (percent >= 90) return '#10B981'; // 绿色
    if (percent >= 70) return '#3B82F6'; // 蓝色
    if (percent >= 50) return '#F59E0B'; // 橙色
    return '#EF4444'; // 红色
  };

  const color = getColor(percentage);

  return (
    <div className="progress-circle" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* 背景圆环 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* 进度圆环 */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </svg>
      {/* 百分比文字 */}
      <div
        style={{
          position: 'absolute',
          fontSize: size > 50 ? '0.875rem' : '0.75rem',
          fontWeight: '600',
          color: color,
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressCircle;
