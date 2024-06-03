import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  name: string;
  href: string;
  children: ReactNode[]; 
}

const CardPanel = ({ name, href, children }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (children.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [children.length]);

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const getContainerWidth = () => {
    if (containerRef.current) {
      return containerRef.current.clientWidth;
    }
    return 0;
  };

  const calculateTransform = () => {
    const containerWidth = getContainerWidth();
    const itemsPerView = containerWidth >= 600 ? 3.5 : containerWidth >= 500 ? 2.1 : 1.7;
    const itemWidth = containerWidth / itemsPerView;
    return -(currentIndex * itemWidth);
  };

  return (
    <div className="mt-3 overflow-hidden bg-white border-2 rounded-lg border-neutral-200" ref={containerRef}>
      <div className="flex items-center justify-between px-4 py-5">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
      <div className="relative">
        <button
          onClick={handleLeftClick}
          className="absolute left-0 z-10 p-2 -translate-y-1/2 rounded-full text-grey-700 bg-white/45 backdrop-blur-md top-1/2"
          style={{ left: '10px' }}
        >
          &#8592;
        </button>
        <div
          className="flex items-center transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(${calculateTransform()}px)`,
            width: '100%',
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div style={{ flex: 'none', padding: '0 6px' }} key={index}>
              {child}
            </div>
          ))}
        </div>
        <button
          onClick={handleRightClick}
          className="absolute right-0 z-10 p-2 -translate-y-1/2 rounded-full text-grey-700 bg-white/45 backdrop-blur-md top-1/2"
          style={{ right: '10px' }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default CardPanel;
