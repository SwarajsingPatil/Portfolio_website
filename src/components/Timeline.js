import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, config } from 'react-spring';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const TimelineItem = ({ date, title, subtitle, description, isNew = false, delay = 0, type }) => {
  const props = useSpring({
    opacity: 1,
    transform: 'translateX(0)',
    from: { opacity: 0, transform: isNew ? 'translateX(-100%)' : 'translateY(50px)' },
    delay: delay,
    config: config.gentle
  });

  const Icon = type === 'experience' ? FaBriefcase : FaGraduationCap;

  return (
    <animated.div style={props} className={`mb-8 flex justify-between items-center w-full ${isNew ? 'text-green-500' : ''}`}>
      <div className="order-1 w-5/12 flex justify-end">
        <Icon size={24} className="text-blue-500 mr-4" />
      </div>
      <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{date}</h1>
      </div>
      <div className="order-1 bg-gray-900 rounded-lg shadow-xl w-5/12 px-6 py-4">
        <h3 className="mb-3 font-bold text-white text-xl">{title}</h3>
        <h4 className="mb-3 font-semibold text-gray-400 text-md">{subtitle}</h4>
        <p className="text-sm leading-snug tracking-wide text-gray-300 text-opacity-100">{description}</p>
      </div>
    </animated.div>
  );
};

const Timeline = ({ items }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [timelineItems, setTimelineItems] = useState(items);
  const [isShifting, setIsShifting] = useState(false);

  const containerProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: `translateY(${isShifting ? '215px' : '0px'})`,
    config: config.gentle
  });

  useEffect(() => {
    if (inView) {
      const shiftTimer = setTimeout(() => {
        setIsShifting(true);
      }, 1000);

      const newItemTimer = setTimeout(() => {
        setTimelineItems(prevItems => [
          {
            date: "Present",
            title: "Software Engineer",
            subtitle: "Your Company",
            description: "Ready to bring my skills and experience to your team!",
            isNew: true,
            type: 'experience'
          },
          ...prevItems
        ]);
        setIsShifting(false);
      }, 1500);

      return () => {
        clearTimeout(shiftTimer);
        clearTimeout(newItemTimer);
      };
    }
  }, [inView]);

  return (
    <animated.div ref={ref} style={containerProps} className="container mx-auto w-full h-full">
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
        {timelineItems.map((item, index) => (
          <TimelineItem key={index} {...item} delay={item.isNew ? 1500 : 0} />
        ))}
      </div>
    </animated.div>
  );
};

export default Timeline;