import React, { useState, useEffect, useCallback } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { ChevronDown } from 'lucide-react';
import '../styles/globals.css';

const FancyButton = ({ isInverted, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonSpring = useSpring({
    scale: isHovered ? 1.05 : 1,
    boxShadow: isHovered 
      ? '0 10px 25px rgba(0, 0, 0, 0.2)' 
      : '0 5px 15px rgba(0, 0, 0, 0.1)',
    config: config.wobbly,
  });

  return (
    <animated.button
      style={buttonSpring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`
        relative px-6 py-3 rounded-full font-bold text-base
        transition-all duration-300 focus:outline-none
        focus:ring-2 focus:ring-opacity-50 overflow-hidden
        ${isInverted ? 'text-gray-200' : 'text-gray-200'}
        before:content-[''] before:absolute before:inset-0 before:-z-10
        before:rounded-full before:bg-gradient-to-r before:from-pink-500
        before:via-purple-500 before:to-indigo-500 before:p-0.5
        after:content-[''] after:absolute after:inset-[2px] after:rounded-full
        after:bg-gray-200 dark:after:bg-gray-800 after:transition-all after:duration-300
        hover:after:bg-transparent
      `}
    >
      <span className="relative z-10">View My Work</span>
    </animated.button>
  );
};

const HeroSection = ({ scrollPosition, scrollToWorkExperience }) => {
  const [isInverted, setIsInverted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInverted(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const colorTransition = useSpring({
    backgroundColor: isInverted ? 'rgb(229, 231, 235)' : 'rgb(31, 41, 55)',
    color: isInverted ? 'rgb(31, 41, 55)' : 'rgb(229, 231, 235)',
    config: { duration: 1000 },
  });

  const fadeIn = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: config.molasses,
  });

  const nameTransition = useSpring({
    fontSize: scrollPosition > 100 ? '1.5rem' : '4rem',
    marginTop: scrollPosition > 100 ? '-80px' : '0px',
    config: { tension: 200, friction: 20 },
  });

  const roles = [
    "Full Stack Developer",
    "Software Engineer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Solutions Architect"
  ];
  
  const [currentRole, setCurrentRole] = useState('');
  const [isScrambling, setIsScrambling] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const characters = 'abcdefghijklmnopqrstuvwxyz/_';
  
  const scrambleText = useCallback((finalText, progress) => {
    return finalText
      .split('')
      .map((char, index) => {
        if (index < progress) return finalText[index];
        if (char === ' ') return ' ';
        return characters[Math.floor(Math.random() * characters.length)];
      })
      .join('');
  }, []);

  useEffect(() => {
    let frame = 0;
    let currentProgress = 0;
    const targetText = roles[roleIndex];
    let animationFrameId;
    let timeoutId;
    
    setIsCompleted(false);
    setIsScrambling(true);
    
    const updateText = () => {
      if (!isScrambling) return;
      
      frame++;
      if (frame % 3 === 0) {
        currentProgress++;
      }
      
      const newText = scrambleText(targetText, currentProgress);
      setCurrentRole(newText);
      
      if (currentProgress <= targetText.length) {
        animationFrameId = requestAnimationFrame(updateText);
      } else {
        setIsCompleted(true);
        timeoutId = setTimeout(() => {
          setIsCompleted(false);
          setIsScrambling(true);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
      }
    };
    
    updateText();
    return () => {
      currentProgress = targetText.length;
    };
  }, [roleIndex, isScrambling, scrambleText]);

  return (
    <animated.div style={colorTransition} className="min-h-screen flex flex-col items-center justify-center relative">
      <animated.div style={fadeIn} className="text-center">
        <animated.h1 style={nameTransition} className="font-bold mb-4">
          Swarajsing Patil
        </animated.h1>
        
        <div className="h-12 relative text-xl mb-6 font-bold">
          <p 
            className={`text-2xl font-mono tracking-wide transition-all duration-500 bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-600 text-transparent bg-clip-text
              ${isCompleted ? 'glow-effect' : ''}`}
            style={{
              textShadow: isCompleted 
                ? '0 0 10px rgba(96, 165, 250, 0.8), 0 0 20px rgba(139, 92, 246, 0.6)' 
                : 'none',
              transition: 'text-shadow 0.5s ease-in-out, color 0.5s ease-in-out'
            }}
          >
            {currentRole || '\u00A0'}
          </p>
          
          {/* <div 
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-px bg-blue-400 transition-all duration-500
              ${isCompleted ? 'w-full opacity-50' : 'w-0 opacity-0'}`}
            style={{
              boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)',
            }}
          /> */}
        </div>
        <p className="text-lg mb-8">
          Passionate about creating efficient and scalable solutions
        </p>
        <FancyButton isInverted={isInverted} onClick={scrollToWorkExperience} />
      </animated.div>
      <animated.div style={fadeIn} className="absolute bottom-10 animate-bounce">
        <ChevronDown size={32} />
      </animated.div>
    </animated.div>
  );
};

export default HeroSection;
