// 위에서 아래로 페이드인

import { motion } from 'framer-motion';

const animationVariants = {
  fadeInSlower: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.3 } },
    // 투명도를 0에서 1로 변경하여 서서히 나타나는 효과 느리게
  },
  fadeInSlow: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.0 } },
    // 투명도를 0에서 1로 변경하여 서서히 나타나는 효과 느리게
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.7 } },
    // 투명도를 0에서 1로 변경하여 서서히 나타나는 효과
  },
  fadeInFast: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    // 투명도를 0에서 1로 변경하여 서서히 나타나는 효과 빠르게
  },
  fadeInFaster: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.2 } },
    // 투명도를 0에서 1로 변경하여 서서히 나타나는 효과 빠르게
  },


  slideUpSlower: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.3 } },
    // 아래에서 위로 슬라이드하면서 나타나는 효과 느리게
  },
  slideUpSlow: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.0 } },
    // 아래에서 위로 슬라이드하면서 나타나는 효과 느리게
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    // 아래에서 위로 슬라이드하면서 나타나는 효과
  },
  slideUpFast: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    // 아래에서 위로 슬라이드하면서 나타나는 효과 빠르게
  },
  slideUpFaster: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    // 아래에서 위로 슬라이드하면서 나타나는 효과 빠르게
  },


  slideDownSlower: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.3 } },
    // 위에서 아래로 슬라이드하면서 나타나는 효과 느리게
  },
  slideDownSlow: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { duration: 1.0 } },
    // 위에서 아래로 슬라이드하면서 나타나는 효과 느리게
  },
  slideDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
    // 위에서 아래로 슬라이드하면서 나타나는 효과
  },
  slideDownFast: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    // 위에서 아래로 슬라이드하면서 나타나는 효과 빠르게
  },
  slideDownFaster: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    // 위에서 아래로 슬라이드하면서 나타나는 효과 빠르게
  },




  zoomInSlow: {
    initial: { scale: 0.9 },
    animate: { scale: 1, transition: { duration: 1.1 } },
    // 작은 크기에서 원래 크기로 확대되면서 나타나는 효과
  },
  zoomIn: {
    initial: { scale: 0.9 },
    animate: { scale: 1, transition: { duration: 0.7 } },
    // 작은 크기에서 원래 크기로 확대되면서 나타나는 효과
  },
  zoomInFast: {
    initial: { scale: 0.9 },
    animate: { scale: 1, transition: { duration: 0.4 } },
    // 작은 크기에서 원래 크기로 확대되면서 나타나는 효과
  },


  powerZoomInSlow: {
    initial: { scale: 0.7 },
    animate: { scale: 1, transition: { duration: 1.1 } },
    // 작은 크기에서 원래 크기로 확대되면서 나타나는 효과
  },
  powerZoomIn: {
    initial: { scale: 0.7 },
    animate: { scale: 1, transition: { duration: 0.7 } },
    // 작은 크기에서 원래 크기로 확대되면서 나타나는 효과
  },
  powerZoomInFast: {
    initial: { scale: 0.7 },
    animate: { scale: 1, transition: { duration: 0.4 } },
    // 작은 크기에서 원래 크기로 확대되면서 나타나는 효과
  },



  zoomOutSlow: {
    initial: { scale: 1.1 },
    animate: { scale: 1, transition: { duration: 1.1 } },
    // 큰 크기에서 원래 크기로 축소되면서 나타나는 효과
  },
  zoomOut: {
    initial: { scale: 1.1 },
    animate: { scale: 1, transition: { duration: 0.7 } },
    // 큰 크기에서 원래 크기로 축소되면서 나타나는 효과
  },
  zoomOutFast: {
    initial: { scale: 1.1 },
    animate: { scale: 1, transition: { duration: 0.7 } },
    // 큰 크기에서 원래 크기로 축소되면서 나타나는 효과
  },


  powerZoomOutSlow: {
    initial: { scale: 1.3 },
    animate: { scale: 1, transition: { duration: 1.1 } },
    // 큰 크기에서 원래 크기로 축소되면서 나타나는 효과
  },
  powerZoomOut: {
    initial: { scale: 1.3 },
    animate: { scale: 1, transition: { duration: 0.7 } },
    // 큰 크기에서 원래 크기로 축소되면서 나타나는 효과
  },
  powerZoomOutFast: {
    initial: { scale: 1.3 },
    animate: { scale: 1, transition: { duration: 0.4 } },
    // 큰 크기에서 원래 크기로 축소되면서 나타나는 효과
  },



  swingFast: {
    initial: { rotate: 0 },
    animate: { rotate: [3, -2, 1, -0.5, 0], transition: { duration: 1 } },
    // 스윙
  },
  swingRebound: {
    initial: { rotate: 0 },
    animate: { rotate: [3, -2, 1, -0.5, 0, -0.5, 0, -0.5, 0], transition: { duration: 1 } },
    // 스윙 반동
  },
  swingPower: {
    initial: { rotate: 0 },
    animate: { rotate: [5, -4, 0, -3, 0, -2, 0, -1, 0], transition: { duration: 1.5 } },
    // 스윙
  },


  VibrationSmall: {
    initial: { rotate: 0 },
    animate: { rotate: [-0.4, 0, -0.3, 0, -0.3, 0, -0.2, 0, -0.1, 0], transition: { duration: 1 } },
    // 진동 약하게
  },
  Vibration: {
    initial: { rotate: 0 },
    animate: { rotate: [-1, 0, -1, 0, -0.8, 0, -0.6, 0, -0.2, 0, -0.2, 0], transition: { duration: 1 } },
    // 진동
  },
  VibrationPower: {
    initial: { rotate: 0 },
    animate: { rotate: [-1.7, 0, -1.5, 0, -1, 0, -0.8, 0, -0.6, 0, -0.4, 0], transition: { duration: 1 } },
    // 진동 세게
  },
  VibrationStrong: {
    initial: { rotate: 0 },
    animate: { rotate: [-3, 0, -3, 0, -2, 0, -2, 0, -1, 0, -1, 0], transition: { duration: 1 } },
    // 진동 더 강하게
  },



  // 1. 기본 bounceIn 효과
  bounceIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    // 기본적인 bounceIn 애니메이션
  },

  // 2. bounceIn 변형 - 더 부드러운
  softBounceIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 50 } },
    // 더 부드러운 효과
  },

  // 3. bounceIn 변형 - 더 강한
  strongBounceIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 200 } },
    // 더 강한 튕김 효과
  },

  // 4. bounceIn 변형 - 좌측에서
  bounceInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    // 왼쪽에서 튀어나오기
  },

  // 5. bounceIn 변형 - 우측에서
  bounceInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    // 오른쪽에서 튀어나오기
  },

  // 6. bounceIn 변형 - 위에서
  bounceInUp: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    // 위에서 아래로 떨어지기
  },

  // 7. bounceIn 변형 - 아래서
  bounceInDown: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
    // 아래에서 위로 솟구치기
  },

  // 8. bounceIn 변형 - 투명도 변화 없음
  bounceInNoOpacity: {
    initial: { scale: 0.9 },
    animate: { scale: 1, transition: { type: 'spring', stiffness: 100 } },
    // 투명도 변화 없이 크기만 변함
  },

  // 9. bounceIn 변형 - 빠른
  fastBounceIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 100, duration: 0.4 } },
    // 빠르게 효과 적용
  },


  // 11. bounceIn 변형 - 각도 회전 포함
  rotateBounceIn: {
    initial: { scale: 0.9, opacity: 0, rotate: -45 },
    animate: { scale: 1, opacity: 1, rotate: 0, transition: { type: 'spring', stiffness: 100 } },
    // 회전하면서 등장
  },




  
  flipX: {
    initial: { rotateX: 90 },
    animate: { rotateX: 0, transition: { duration: 0.7 } },
  },

  
  flipY: {
    initial: { rotateY: 90 },
    animate: { rotateY: 0, transition: { duration: 0.7 } },
  },
  pulse: {
    initial: { scale: 1 },
    animate: { scale: [1, 1.05, 1], transition: { duration: 0.7, repeat: Infinity, repeatDelay: 1 } },
  },


};


const AnimatedContainer = ({ children, type = 'fadeIn' }) => {
  const selectedVariant = animationVariants[type] || animationVariants.fadeIn;

  return (
    <motion.div
      initial={selectedVariant.initial}
      animate={selectedVariant.animate}
      className="flex flex-grow mb-28 flex-col items-center justify-center w-full gap-10"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedContainer;
