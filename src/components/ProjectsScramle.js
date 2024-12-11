import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsScramble = ({projects}) => {
//   const projects = [
//     {
//       title: "AI Chat Application",
//       description: `• Built a real-time chat application using Next.js 13, integrating OpenAI's GPT-3.5 API for intelligent responses
// • Implemented WebSocket connections with Socket.io, enabling instant message delivery with 50ms latency
// • Designed a responsive UI with Tailwind CSS and Framer Motion, achieving a 95+ mobile responsiveness score
// • Deployed using Docker and AWS EC2, maintaining 99.9% uptime and handling 1000+ daily active users`,
//       tech: ["Next.js", "OpenAI", "Socket.io", "Docker", "AWS"],
//       link: "https://github.com/yourusername/ai-chat",
//       demo: "https://ai-chat-demo.com"
//     },
//     {
//       title: "E-Commerce Platform",
//       description: `• Developed a full-stack e-commerce platform using MERN stack with TypeScript, serving 10k+ monthly users
// • Integrated Stripe payment gateway and implemented cart functionality with Redux Toolkit for state management
// • Optimized image loading using Next.js Image component and lazy loading, improving load time by 40%
// • Implemented JWT authentication and role-based access control for secure user management`,
//       tech: ["React", "Node.js", "MongoDB", "TypeScript", "Redux"],
//       link: "https://github.com/yourusername/ecommerce",
//       demo: "https://ecommerce-demo.com"
//     },
//     {
//       title: "Portfolio Website",
//       description: `• Created a modern portfolio website using React and Three.js for interactive 3D elements
// • Implemented smooth animations and transitions using Framer Motion
// • Achieved 100% lighthouse performance score through optimization techniques
// • Designed and developed a custom CMS for easy content management`,
//       tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
//       link: "https://github.com/yourusername/portfolio",
//       demo: "https://your-portfolio.com"
//     }
//   ];

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('');
  const [isScrambling, setIsScrambling] = useState(false);
  const [isTitleFormed, setIsTitleFormed] = useState(false);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const scrambleText = useCallback((text, maxDuration = 200, minDuration = 50) => {
    const scrambleLine = (text) => {
      const totalDuration = Math.min(maxDuration, Math.max(minDuration, text.length * 150));
      const interval = 50; 
      const steps = Math.floor(totalDuration / interval);

      const positions = Array.from({ length: text.length }, (_, i) => i);
      let currentText = new Array(text.length).fill('');
      let iteration = 0;

      const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      };
      shuffle(positions);

      return () => {
        const progress = Math.min(iteration / steps, 1);
        const numToResolve = Math.floor(progress * text.length);

        // Gradually resolve characters
        positions.slice(0, numToResolve).forEach((pos) => {
          currentText[pos] = text[pos];
        });

        // Keep scrambling unresolved characters
        positions.slice(numToResolve).forEach((pos) => {
          currentText[pos] = characters[Math.floor(Math.random() * characters.length)];
        });

        iteration++;
        return currentText.join('');
      };
    };

    return scrambleLine(text);
  }, [characters]);

  const reverseScrambleText = useCallback((text, maxDuration = 100, minDuration = 50) => {
    // Reverse scramble: we start with correct text and gradually replace characters with random ones.
    const reverseScrambleLine = (text) => {
      const totalDuration = Math.min(maxDuration, Math.max(minDuration, text.length * 150));
      const interval = 50;
      const steps = Math.floor(totalDuration / interval);

      let currentText = text.split('');
      let iteration = 0;

      return () => {
        const progress = Math.min(iteration / steps, 1);
        const numToRandomize = Math.floor(progress * text.length);

        // As progress increases, we convert more and more of the text into random chars
        for (let i = 0; i < numToRandomize; i++) {
          currentText[i] = characters[Math.floor(Math.random() * characters.length)];
        }

        iteration++;
        return currentText.join('');
      };
    };

    return reverseScrambleLine(text);
  }, [characters]);

  useEffect(() => {
    const animateTransition = async () => {
      const targetProject = projects[currentProjectIndex];

      setIsScrambling(true);
      setIsTitleFormed(false);

      if (currentTitle) {
        const updateReverseTitle = reverseScrambleText(currentTitle);
        let titleRandomized = false;

        while (!titleRandomized) {
          await new Promise((resolve) => {
            setTimeout(() => {
              const newTitle = updateReverseTitle();
              setCurrentTitle(newTitle);
              resolve();
            }, 30);
          });
          if (Math.random() < 0.01) titleRandomized = true;
        }
      }

      const updateTitle = scrambleText(targetProject.title);
      let isCompleteTitle = false;

      while (!isCompleteTitle) {
        await new Promise((resolve) => {
          setTimeout(() => {
            const newTitle = updateTitle();
            setCurrentTitle(newTitle);
            if (newTitle === targetProject.title) {
              isCompleteTitle = true;
              setIsTitleFormed(true);
            }
            resolve();
          }, 30);
        });
      }
      
      setIsScrambling(false);
    };

    animateTransition();
  }, [currentProjectIndex]);

  // Add new state for tracking card positions
  const [direction, setDirection] = useState(0);
  const [stackCards, setStackCards] = useState([]);

  // Update stack cards when currentProjectIndex changes
  useEffect(() => {
    const updateStack = () => {
      const cards = projects.map((project, idx) => ({
        title: project.title,
        position: idx - currentProjectIndex
      }));
      setStackCards(cards);
    };
    updateStack();
  }, [currentProjectIndex, projects]);

  const handleNextProject = () => {
    setDirection(1);
    setCurrentProjectIndex((prev) => (prev < projects.length - 1 ? prev + 1 : 0));
  };

  const handlePrevProject = () => {
    setDirection(-1);
    setCurrentProjectIndex((prev) => (prev > 0 ? prev - 1 : projects.length - 1));
  };

  return (
<div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 relative overflow-visible">

      {/* Add animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glowing-orb-1" />
        <div className="glowing-orb-2" />
        <div className="glowing-orb-3" />
      </div>

      {/* Add blur overlay */}
      <div className="absolute inset-0 backdrop-blur-[100px]" />

      <motion.div 
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Stack navigation first */}
        <div className="relative h-16 mb-4">
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-4">
            {stackCards.map(({ title, position }, index) => (
              <motion.div
                key={title}
                className={`cursor-pointer px-6 py-2 rounded-lg text-sm font-medium
                  ${position === 0 ? 'bg-blue-500 text-white' : 'bg-gray-800/50 text-gray-400'}`}
                initial={{ scale: 0, x: position * 100 }}
                animate={{ 
                  scale: 1,
                  x: position * 120,
                  opacity: Math.abs(position) > 1 ? 0 : 1,
                  zIndex: -Math.abs(position)
                }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setDirection(position > 0 ? 1 : -1);
                  setCurrentProjectIndex(index);
                }}
              >
                {title}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Title between carousel and card */}
        <h2 className={`text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r 
          from-blue-400 to-purple-500 transition-all duration-300 ${isTitleFormed ? 'glow-effect' : ''}`}
        >
          {currentTitle}
        </h2>

        {/* Main content card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentProjectIndex}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl relative overflow-hidden"
            initial={{ 
              x: direction * 200,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              x: 0,
              opacity: 1,
              scale: 1
            }}
            exit={{ 
              x: -direction * 200,
              opacity: 0,
              scale: 0.8
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: 'auto', 
                opacity: 1
              }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              {/* New animated description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {projects[currentProjectIndex].description.split('• ').map((bullet, index) => (
                  bullet && (
                    <motion.div
                      key={index}
                      initial={{ 
                        x: -20, 
                        opacity: 0,
                        background: "rgba(59, 130, 246, 0.1)"
                      }}
                      animate={{ 
                        x: 0, 
                        opacity: 1,
                        background: "rgba(59, 130, 246, 0)"
                      }}
                      transition={{ 
                        delay: index * 0.15,
                        duration: 0.5,
                        background: { duration: 1.5 }
                      }}
                      className="flex items-start p-3 rounded-lg hover:bg-blue-500/10 transition-colors duration-300"
                    >
                      <motion.span 
                        className="text-blue-400 mr-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.2 }}
                      >
                        •
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.1 }}
                        className="text-gray-300"
                      >
                        {bullet.trim()}
                      </motion.span>
                    </motion.div>
                  )
                ))}
              </motion.div>

              {/* Tech stack section with enhanced animations */}
              <motion.div 
                className="flex flex-wrap gap-2 mt-8 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {projects[currentProjectIndex].tech.map((tech, index) => (
                  <motion.span 
                    key={index}
                    initial={{ 
                      x: -50,
                      opacity: 0,
                    }}
                    animate={{ 
                      x: 0,
                      opacity: 1,
                    }}
                    transition={{ 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    className="px-4 py-2 bg-gray-700/50 text-blue-300 rounded-full text-sm
                      hover:bg-blue-500/20 hover:scale-105 transition-all duration-300
                      shadow-lg shadow-blue-500/5 hover:shadow-blue-500/20"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              <div className="flex flex-wrap gap-4 mt-6">
                <a 
                  href={projects[currentProjectIndex].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
                <div className="flex-1 flex justify-center gap-4">
                  <button 
                    onClick={handlePrevProject}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Previous
                  </button>
                  <button 
                    onClick={handleNextProject}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  >
                    Next
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsScramble;
