import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiKubernetes } from 'react-icons/si';

const Skill = ({ name, level, icon: Icon }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const props = useSpring({
    width: inView ? `${level}%` : '0%',
    config: config.molasses,
  });

  const iconProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(20px)',
    config: config.wobbly,
  });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex items-center mb-2">
        <animated.div style={iconProps} className="mr-3">
          <Icon size={24} className="text-blue-500" />
        </animated.div>
        <span className="text-lg font-semibold text-white">{name}</span>
      </div>
      <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
        <animated.div
          style={props}
          className="h-full bg-blue-500 rounded-full"
        />
      </div>
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
    { name: 'Python', level: 80, icon: FaPython },
    { name: 'JavaScript', level: 90, icon: SiJavascript },
    { name: 'TypeScript', level: 75, icon: SiTypescript },
  ];

  const otherSkills = [
    { name: 'AWS', icon: FaAws },
    { name: 'Docker', icon: FaDocker },
    { name: 'Kubernetes', icon: SiKubernetes },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'PostgreSQL', icon: SiPostgresql },
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Skills</h2>
        <div className="mb-12">
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