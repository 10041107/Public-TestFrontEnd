import React, { ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode[];
}

const IndexCardPanel = ({ children }: Props) => {
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
    const itemsPerView = containerWidth <= 500 ? 2.1 : containerWidth <= 600 ? 3.8 : 3.8;
    const itemWidth = containerWidth / itemsPerView;
    return -(currentIndex * itemWidth);
};


  return (
    <div className="overflow-hidden rounded-lg" ref={containerRef}>
      <div className="flex items-center justify-between px-4 py-5">
      </div>
      <div className="relative top-10">
        <button
          onClick={handleLeftClick}
          className="absolute left-0 z-10 p-2 -translate-y-1/2 rounded-full bg-neutral-500 text-grey-700 backdrop-blur-md top-1/2"
          style={{ left: '10px', border: '2px solid white' }}
        >
          &#8592;
        </button>
        <div
          className="flex items-center transition-transform duration-500 ease-in-out"
          style={{
            height: '0px', 
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
          className="absolute right-0 z-10 p-2 -translate-y-1/2 rounded-full bg-neutral-500 text-grey-700 backdrop-blur-md top-1/2"
          style={{ right: '10px', border: '2px solid white' }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default IndexCardPanel;
