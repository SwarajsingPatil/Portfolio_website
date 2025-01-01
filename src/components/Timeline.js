import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated, config } from 'react-spring';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

const TimelineItem = ({ date, title, subtitle, description, type, isPresent }) => {
  const animationProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: config.gentle,
  });

  const Icon = type === 'experience' ? FaBriefcase : FaGraduationCap;

  return (
    <animated.div style={animationProps} className="flex items-center mb-12">
      <div className="w-1/2 text-right pr-4">
        {(type === 'education') && (
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <h3 className="text-white text-lg font-bold">{title}</h3>
            <h4 className="text-gray-400 text-md mb-2">{subtitle}</h4>
            <p className="text-gray-300 text-sm">{description}</p>
            <span className="text-gray-500 text-sm">{date}</span>
          </div>
        )}
      </div>
      <div className="relative z-10">
        <div
          className={`w-8 h-8 flex items-center justify-center ${
            isPresent ? 'bg-green-500' : 'bg-blue-500'
          } rounded-full shadow-lg`}
        >
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="w-1/2 pl-4">
        {type === 'experience' && (
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <h3 className="text-white text-lg font-bold">{title}</h3>
            <h4 className="text-gray-400 text-md mb-2">{subtitle}</h4>
            <p className="text-gray-300 text-sm">{description}</p>
            <span className="text-gray-500 text-sm">{date}</span>
          </div>
        )}
      </div>
    </animated.div>
  );
};

const Timeline = ({ items }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: config.gentle,
  });

  const timelineItems = [
    {
      date: 'Present',
      title: 'Software Engineer',
      subtitle: 'Your Company',
      description: 'Ready to bring my skills and experience to your team!',
      type: 'experience',
      isPresent: true,
    },
    ...items,

  ];

  return (
    <animated.div ref={ref} style={containerProps} className="container mx-auto px-10 py-20">
      <div >
        {timelineItems.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500 -z-10"
        ></div>
      </div>
    </animated.div>
  );
};

export default Timeline;
