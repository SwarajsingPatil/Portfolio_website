import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiKubernetes } from 'react-icons/si';

const Skill = ({ name, level }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const textProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: config.stiff,
  });

  return (
    <div ref={ref} className="mb-8">
      <animated.div style={textProps} className="relative group">
        <span className="text-xl font-semibold text-white">
          {name}
        </span>
        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-all duration-300 ease-in-out" />
        {/* <span className="text-sm text-gray-400 ml-2">{level}%</span> */}
      </animated.div>
    </div>
  );
};


const SkillGrid = ({ skills }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const gridProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: config.gentle,
  });

  return (
    <animated.div ref={ref} style={gridProps} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center"
        >
          <skill.icon size={48} className="text-blue-500 mb-2" />
          <span className="text-white text-center">{skill.name}</span>
        </div>
      ))}
    </animated.div>
  );
};

const Skills = () => {
  const mainSkills = [
    { name: 'React', level: 90, icon: FaReact },
    { name: 'Node.js', level: 85, icon: FaNodeJs },
    { name: 'FastAPI', level: 90, icon: SiJavascript },
    // { name: 'Django', level: 90, icon: SiJavascript },
    { name: 'Python', level: 80, icon: FaPython },
    { name: 'JavaScript', level: 75, icon: SiTypescript },
  ];

  const otherSkills = [
    { name: 'AWS', icon: FaAws },
    { name: 'Docker', icon: FaDocker },
    { name: 'Kubernetes', icon: SiKubernetes },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'PostgreSQL', icon: SiPostgresql },
  ];

  return (
    <section className="pt-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-white">Skills & Technologies</h2>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">Core Skills</h3>
          {mainSkills.map((skill, index) => (
            <Skill key={index} {...skill} />
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-6 text-center text-white">Other Technologies</h3>
        <SkillGrid skills={otherSkills} />
      </div>
    </section>
  );
};

export default Skills;
