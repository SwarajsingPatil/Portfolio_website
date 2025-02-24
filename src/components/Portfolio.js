import React, { useState, useEffect, useRef } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, MenuIcon, XIcon, DownloadIcon } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import HeroSection from './HeroSection';
import Timeline from './Timeline';
import Skills from './Skill';
import ProjectsScramble from './ProjectsScramle';
import emailjs from 'emailjs-com';

const AnimatedSection = ({ children, className }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: config.slow,
  });

  return (
    <animated.section ref={ref} style={animation} className={className}>
      {children}
    </animated.section>
  );
};


const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        'service_e25m6jh',
        'template_0d1wbnv',
        formData,
        'AJh73pwi1V_UiGZhu'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setStatus('Message sent successfully!');
          setFormData({ name: '', email: '', message: '' });
        },
        (error) => {
          console.error('FAILED...', error);
          setStatus('Failed to send message. Please try again later.');
        }
      );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-white dark:text-gray-300"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-500 h-12 px-4 text-sm transition-all duration-300 ease-in-out"
          required
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white dark:text-gray-300"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-500 h-12 px-4 text-sm transition-all duration-300 ease-in-out"
          required
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-white dark:text-gray-300"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          placeholder="Enter your message here"
          className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-500 p-4 text-sm transition-all duration-300 ease-in-out resize-none"
          required
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 active:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-500 dark:active:bg-blue-700"
        >
          Send Message
        </button>
      </div>
      {status && (
        <p
          className={`mt-2 text-sm ${
            status.includes("successfully")
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
};



const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const timelineRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const [refs, setRefs] = useState({});
  const containerRef = useRef(null);
  const [showResume, setShowResume] = useState(false);

  const toggleResume = () => {
    setShowResume(!showResume);
  };

  const scrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionRef);
    }
    setMenuOpen(false);
  };

  const scrollToWorkExperience = () => {
    scrollToSection(timelineRef);
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const aboutSection = containerRef.current.querySelector('#about');
      const skillsSection = containerRef.current.querySelector('#skills');
      const timelineSection = containerRef.current.querySelector('#timeline');
      const projectsSection = containerRef.current.querySelector('#projects');
      const contactSection = containerRef.current.querySelector('#contact');

      setRefs({
        about: aboutSection,
        skills: skillsSection,
        timeline: timelineSection,
        projects: projectsSection,
        contact: contactSection
      });
    }
  }, []);

  const NavLink = ({ sectionRef, children }) => (
    <button
      onClick={() => scrollToSection(sectionRef)}
      className={`px-3 py-2 rounded-md text-sm font-medium ${activeSection === sectionRef
          ? 'bg-blue-500 text-white'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
    >
      {children}
    </button>
  );

  // const projects = [
  //   {
  //     title: "Nurture Nest / Baby Care",
  //     description: "Boosted user engagement by 30% through engineering a job module using React and Redux. Reduced time-to-hire by 25% with an Applicant Hiring portal using Firebase authentication. Enhanced communication with real-time chat implementation using socket.io.",
  //     image: "https://zero-to-three.s3.amazonaws.com/images/1404/736d9d21-7a02-4ab3-a02b-e5de2f5942f9-small.jpg?1487014786",
  //     link: "https://github.com/yourusername/nurture-nest"
  //   },
  //   {
  //     title: "Fast API E-Commerce",
  //     description: "Optimized product browsing and purchasing by developing an e-commerce platform with Python FastAPI. Restricted unauthorized access attempts by integrating JWT authentication. Improved message processing time by 60% and deployment time by 30% with Kafka and Docker.",
  //     image: "https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg",
  //     link: "https://github.com/yourusername/fastapi-ecommerce"
  //   },
  //   {
  //     title: "Java-web-bookstore",
  //     description: "Developed with Spring Boot and Thymeleaf, optimized MySQL queries with 25% faster data retrieval.",
  //     image: "/path-to-project-image.jpg",
  //     link: "https://github.com/yourusername/java-web-bookstore"
  //   },
  //   {
  //     title: "Stowage Planner",
  //     description: "Flask-based web app, reduced 40% loading time & increased user satisfaction by 30% with optimized algorithms.",
  //     image: "/path-to-project-image.jpg",
  //     link: "https://github.com/yourusername/stowage-planner"
  //   },
  //   {
  //     title: "SubSplit-Subscription",
  //     description: "Streamlined shared memberships & interest-based groups management with MongoDB & NodeJS.",
  //     image: "/path-to-project-image.jpg",
  //     link: "https://github.com/yourusername/subsplit-subscription"
  //   },
  //   {
  //     title: "Multiplayer Tic-Tac-Toe",
  //     description: "Real-time collaboration app with FluidFramework, Puppeteer, Docker with login and admin features.",
  //     image: "/path-to-project-image.jpg",
  //     link: "https://github.com/yourusername/multiplayer-tic-tac-toe"
  //   },
  //   // Add more projects here
  // ];



  const projects = [
    {
      title: "Nurture Nest / Baby Care",
      description: [
        "Boosted user engagement by 30% through engineering a job module using React and Redux, allowing seamless user interaction.",
        "Reduced time-to-hire by 25% with an Applicant Hiring portal built using Firebase authentication, improving security and efficiency.",
        "Enhanced communication with real-time chat implementation using Socket.io, enabling instant messaging between parents and caregivers.",
        "Integrated dynamic notifications and user profiles to personalize user experience and increase engagement rates."
      ],
      tech: ["React", "Redux", "Firebase", "Socket.io", "Node.js"],
      image: "https://zero-to-three.s3.amazonaws.com/images/1404/736d9d21-7a02-4ab3-a02b-e5de2f5942f9-small.jpg?1487014786",
      link: "https://github.com/SwarajsingPatil/nurture-nest",
      demo: "https://nurture-nest-demo.com"
    },
    {
      title: "SubSplit-Subscription",
      description: [
        "Streamlined shared memberships and interest-based groups management with MongoDB and Node.js, allowing users to share subscriptions.",
        "Implemented dynamic group creation and automatic payment splitting for services like Netflix and Spotify, increasing user convenience.",
        "Enhanced notification system to alert users about upcoming payments and membership renewals, boosting engagement and retention.",
        "Deployed the platform using AWS, ensuring high availability and scalability, handling hundreds of subscriptions per day."
      ],
      tech: ["MongoDB", "Node.js", "Express", "AWS", "JavaScript"],
      image: "/path-to-project-image.jpg",
      link: "https://github.com/SwarajsingPatil/CS546_Group28_Final_Project",
      demo: "https://subsplit-subscription-demo.com"
    },
    {
      title: "Multiplayer Tic-Tac-Toe",
      description: [
        "Developed a real-time multiplayer Tic-Tac-Toe game using FluidFramework, allowing users to collaborate and play together in real-time.",
        "Implemented Puppeteer for automated testing and Docker for containerized deployment, ensuring smooth scalability.",
        "Included login and admin features, providing personalized game experiences and moderation for a secure gameplay environment.",
        "Deployed the game using cloud services, providing high availability and low latency for global users."
      ],
      tech: ["FluidFramework", "Puppeteer", "Docker", "Node.js", "JavaScript"],
      image: "/path-to-project-image.jpg",
      link: "https://github.com/SwarajsingPatil/TournamentServer",
      demo: "https://multiplayer-tic-tac-toe-demo.com"
    },
    {
      title: "Portfolio Website",
      description: [
        "Created a modern portfolio website using React and Three.js for interactive 3D elements",
        "Implemented smooth animations and transitions using Framer Motion",
        "Achieved 100% lighthouse performance score through optimization techniques",
        "Designed and developed a custom CMS for easy content management"
      ],
      tech: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
      link: "https://github.com/SwarajsingPatil/Portfolio_website",
      demo: "https://your-portfolio.com"
    },
    {
      title: "Fast API E-Commerce",
      description: [
        "Optimized product browsing and purchasing by developing an e-commerce platform with Python FastAPI, achieving a faster product search and checkout process.",
        "Restricted unauthorized access attempts by integrating JWT authentication, ensuring secure user logins and transactions.",
        "Improved message processing time by 60% and deployment time by 30% with Kafka and Docker, providing real-time product updates and faster scaling.",
        "Implemented advanced inventory management system to track stock levels and streamline order fulfillment, improving operational efficiency."
      ],
      tech: ["FastAPI", "Python", "JWT", "Kafka", "Docker", "PostgreSQL"],
      image: "https://d1u4v6449fgzem.cloudfront.net/2020/03/The-Ecommerce-Business-Model-Explained.jpg",
      link: "",
      demo: "https://fastapi-ecommerce-demo.com"
    },
    {
      title: "LLM-Based Document Search",
      description: [
        "Developed a robust document search system using Llama-Index, Hugging Face, and Pinecone, enabling high-accuracy search results.",
        "Leveraged Llama-Index for efficient document indexing and retrieval, optimizing search performance for large datasets.",
        "Integrated Hugging Face's transformer models to enhance natural language understanding, improving query interpretation.",
        "Implemented Pinecone as a vector database to store and retrieve document embeddings efficiently, ensuring scalability and speed."
      ],
      tech: ["Llama-Index", "Hugging Face", "Pinecone", "Python", "Transformers"],
      image: "https://docs.llamaindex.ai/en/stable/_static/logo.png",
      link: "https://github.com/SwarajsingPatil/LLM-document-search",
      demo: "https://docs.llamaindex.ai/en/stable/examples/"
    },
    {
      title: "Stowage Planner",
      description: [
        "Built with Flask, this web app is designed to optimize storage space for warehouses and containers by planning stowage locations.",
        "Reduced 40% loading time by implementing efficient algorithms for container and goods categorization.",
        "Increased user satisfaction by 30% with a responsive design and interactive 3D visualizations of storage layouts using WebGL.",
        "Implemented real-time updates and collaborative features, allowing warehouse managers to coordinate better and make quick decisions."
      ],
      tech: ["Flask", "Python", "WebGL", "JavaScript", "CSS"],
      image: "/path-to-project-image.jpg",
      link: "https://github.com/SwarajsingPatil",
      demo: "https://stowage-planner-demo.com"
    }

  ];



  const navbarAnimation = useSpring({
    opacity: scrollPosition > 100 ? 1 : 0,
    transform: scrollPosition > 100 ? 'translateY(0)' : 'translateY(-100%)',
    config: config.gentle,
  });

  const darkModeAnimation = useSpring({
    backgroundColor: darkMode ? 'rgb(17, 24, 39)' : 'rgb(255, 255, 255)',
    color: darkMode ? 'rgb(229, 231, 235)' : 'rgb(31, 41, 55)',
  });

  const timelineItems = [
    {
      date: '2024-2022',
      title: 'Master of Science in Computer Science',
      subtitle: 'Stevens Institute of Technology | Hoboken, USA',
      description: 'Focused on advanced topics in software engineering, cloud computing, and data science.',
      type: 'education'
    },
    {
      date: '2022-2021',
      title: 'DevOps Engineer',
      subtitle: 'Sigmoid | Bengaluru, India',
      description: 'Designed & developed full-stack web applications using React, NodeJS. Created and optimized APIs with Python and FastAPI. Managed Docker & Kubernetes for scalable solutions.',
      type: 'experience'
    },
    {
      date: 'June 2019 – August 2019',
      title: 'Software Engineer Intern (RPA)',
      subtitle: 'Feat Systems | Mumbai, India',
      description: 'Implemented authentication technologies such as OAuth and SSL to ensure secure data transactions. Improved backend systems with Python, increasing data processing speed by 35% in high-traffic environments. Developed automation with UI-Path, processing data extraction for 8000 files using OCR, reducing 75% manual work. Utilized MySQL & PostgreSQL databases for data storage & retrieval, optimizing queries performance.',
      type: 'experience'
    },
    {
      date: '2021-2017',
      title: 'Bachelor\'s in Computer Engineering',
      subtitle: 'University of Mumbai | Mumbai, India',
      description: 'Gained a strong foundation in computer science fundamentals and software development.',
      type: 'education'
    },
  ];

  const ResumeModal = ({ toggleResume }) => {
    useEffect(() => {
      // Disable scroll on the main page
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, []);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4 overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full h-full max-w-7xl max-h-[95vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Resume</h2>
            <button
              onClick={toggleResume}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
            >
              <XIcon size={24} />
            </button>
          </div>
          <div className="flex-grow overflow-auto">
            <iframe
              src={process.env.PUBLIC_URL + '/Swarajsing_Resume.pdf'}
              className="w-full h-full border-0"
              title="Resume"
            />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <a
              href={process.env.PUBLIC_URL + '/Resume.pdf'}
              download="Swarajsing_Patil_Resume.pdf"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <DownloadIcon size={18} className="mr-2" /> Download PDF
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <animated.div style={darkModeAnimation} className="min-h-screen" ref={containerRef}>
      <animated.nav style={navbarAnimation} className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10">
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="font-semibold text-xl text-gray-800 dark:text-white">
              Swarajsing Patil
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex ml-10 space-x-4">
            <a
              href="#about"
              className="text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              Skills
            </a>
            <a
              href="#timeline"
              className="text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              Experience & Education
            </a>
            <a
              href="#projects"
              className="text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-800 dark:text-white px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              Contact
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#about"
              className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
            >
              Skills
            </a>
            <a
              href="#timeline"
              className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
            >
              Experience & Education
            </a>
            <a
              href="#projects"
              className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
</animated.nav>


      <HeroSection
        scrollPosition={scrollPosition}
        darkMode={darkMode}
        scrollToWorkExperience={scrollToWorkExperience}
      />

      {/* About Section */}
      <div ref={aboutRef} id="about" className="max-w-4xl mx-auto p-4">
        <section className="my-8">
          <h2 className="text-2xl font-semibold mb-4 text-white-800 dark:text-white">About Me</h2>
          <p className="text-white-600 dark:text-gray-300">
            Experienced DevOps Engineer and Full Stack Developer with a strong background in cloud technologies,
            web development, and data engineering. Passionate about creating scalable and efficient solutions.
          </p>
          <button
            onClick={toggleResume}
            className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            <DownloadIcon className="mr-2" /> View Resume
          </button>
        </section>
      </div>

      {showResume && <ResumeModal toggleResume={toggleResume} />}

      {/* Skills Section */}
      <div ref={skillsRef} id="skills" className="max-w-4xl mx-auto p-4">
        <AnimatedSection className="mb-8">
          <Skills />
        </AnimatedSection>
      </div>

      {/* Timeline Section */}
      <div ref={timelineRef} id="timeline" className="max-w-4xl mx-auto p-4">
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Experience & Education</h2>
          <Timeline items={timelineItems} />
        </section>
      </div>

      {/* Projects Section: Make ProjectsScramble full width */}
      <div ref={projectsRef} id="projects" className="w-full">
        <AnimatedSection className="mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Projects</h2>
          <ProjectsScramble projects={projects} />
        </AnimatedSection>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} id="contact" className="max-w-4xl mx-auto p-4">
      <AnimatedSection className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-white dark:text-white">Contact</h2>
        <ContactForm />
        {/* <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white dark:text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-500 h-12 px-4 text-sm transition-all duration-300 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white dark:text-gray-300">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-500 h-12 px-4 text-sm transition-all duration-300 ease-in-out"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white dark:text-gray-300">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message here"
              className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white dark:focus:border-blue-300 dark:focus:ring-blue-500 p-4 text-sm transition-all duration-300 ease-in-out resize-none"
            />
          </div>

          <div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 active:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 dark:bg-blue-600 dark:hover:bg-blue-500 dark:active:bg-blue-700"
            >
              Send Message
            </button>
          </div>
        </form> */}

        <div className="mt-10 py-6 text-center bg-gray-800 text-white">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="mailto:swarajsingpatil@gmail.com" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <MailIcon size={24} />
            </a>
            <a href="https://www.linkedin.com/in/swarajsing/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <LinkedinIcon size={24} />
            </a>
            <a href="https://github.com/SwarajsingPatil?tab=repositories" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              <GithubIcon size={24} />
            </a>
          </div>

          <p className="text-sm text-gray-400">Made by Swarajsing Patil</p>

          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Swarajsing Patil. All Rights Reserved.
          </p>
        </div>
      </AnimatedSection>
    </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setSelectedProject(null)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">{selectedProject.title}</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {selectedProject.description}
                </p>
                {selectedProject.technologies && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-gray-700 dark:text-gray-300">Technologies:</h4>
                    <div className="flex flex-wrap justify-center mt-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="px-2 py-1 m-1 text-sm text-white bg-blue-500 rounded">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="items-center px-4 py-3">
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </animated.div>
  );
};

export default Portfolio;