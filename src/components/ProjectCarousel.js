import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const ProjectCarousel = ({ projects }) => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);
    document.addEventListener('gestureend', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
      document.removeEventListener('gestureend', preventDefault);
    };
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - x.get());
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.pageX - startX;
    const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
    const newX = Math.max(Math.min(0, currentX), -maxScroll);
    set({ x: newX });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="project-carousel relative overflow-hidden w-full" style={{ height: '600px' }}>
      <animated.div
        ref={carouselRef}
        style={{ 
          x,
          cursor: isDragging ? 'grabbing' : 'grab',
          display: 'flex',
          userSelect: 'none',
        }}
        className="h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {projects.map((project, index) => (
          <div key={index} className="w-80 flex-shrink-0 px-2">
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden h-full">
              <img src={project.image} alt={project.title} className="w-full h-60 object-cover" />
              <div className="p-6 flex flex-col h-[calc(100%-240px)]">
                <h3 className="text-xl font-bold mb-3 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4 text-base flex-grow overflow-y-auto">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </animated.div>
    </div>
  );
};

export default ProjectCarousel;