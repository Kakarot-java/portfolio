import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Menu, X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';


export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        alert('Message sent successfully! 🚀');
        setFormData({ name: '', email: '', message: '' });
        setLoading(false);
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('Failed to send message. Try again later.');
        setLoading(false);
      });
  };

  const skills = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React'],
    backend: ['PHP', 'MySQL', 'REST APIs'],
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 left-20 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-sm shadow-lg shadow-purple-500/10' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.h1 
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              MA
            </motion.h1>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium transition-colors hover:text-purple-400 ${
                    activeSection === item.toLowerCase() ? 'text-purple-400' : 'text-gray-300'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <motion.button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 space-y-3"
            >
              {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-gray-300 hover:text-purple-400 transition-colors"
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 sm:mb-6"
          >
            <span className="text-purple-400 text-xs sm:text-sm font-semibold tracking-widest uppercase">
              Full Stack Developer
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Muhammad  Ashhad
            <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent mt-2">
             
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
          >
            Crafting powerful full-stack solutions from concept to deployment
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold shadow-lg shadow-purple-500/50 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-purple-500 rounded-lg font-semibold text-sm sm:text-base"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(168, 85, 247, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          <motion.button
          onClick={() => scrollToSection('about')}
          className="mt-12 sm:mt-16 mx-auto flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1 }, y: { duration: 2, repeat: Infinity } }}
        >
          <ChevronDown size={32} className="text-purple-400" />
        </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center"
          >
            About <span className="text-purple-400">Me</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6"
            >
              I'm a passionate full-stack developer based in Karachi, currently pursuing my journey in software development while building real-world solutions. I specialize in creating dynamic, scalable web applications that solve genuine business problems.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6"
            >
              My approach combines clean, maintainable code with thoughtful user experiences. From responsive frontends to robust backend architectures, I focus on delivering complete solutions that perform flawlessly in production environments.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed"
            >
              With hands-on experience building e-commerce platforms for real clients, I bring a practical understanding of payment integrations, database design, and full-stack development workflows. I'm always eager to tackle new challenges and expand my technical horizons.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-black to-purple-950/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 text-center"
          >
            Tech <span className="text-purple-400">Stack</span>
          </motion.h2>
          
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <motion.div 
                className="bg-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-purple-400">Frontend</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {skills.frontend.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-lg p-3 sm:p-4 text-center font-semibold border border-purple-500/30 text-sm sm:text-base"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group"
            >
              <motion.div 
                className="bg-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-pink-500/20 hover:border-pink-500/60 transition-all duration-300 h-full"
                whileHover={{ y: -10 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-pink-400">Backend</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {skills.backend.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-lg p-3 sm:p-4 text-center font-semibold border border-pink-500/30 text-sm sm:text-base"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 text-center"
          >
            Featured <span className="text-purple-400">Projects</span>
          </motion.h2>
          
          <div className="space-y-6 sm:space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
              className="group bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/60 transition-all duration-300"
            >
              <div className="p-6 sm:p-8 md:p-12">
                <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-3">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-purple-400">Zermique</h3>
                    <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">E-commerce Platform</p>
                  </div>
                  <motion.a
                    href="https://zermique.free.nf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 sm:p-3 bg-purple-600/20 rounded-lg border border-purple-500/30"
                    title="View Live Site"
                    whileHover={{ scale: 1.2, backgroundColor: "rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink size={18} className="sm:w-5 sm:h-5" />
                  </motion.a>
                </div>
                
                <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  A complete full-stack e-commerce solution for a men's cosmetics brand featuring premium products like shampoos, sea salt sprays, and face scrubs. Built from the ground up with a focus on performance, security, and user experience.
                </p>
                
                <div className="mb-4 sm:mb-6">
                  <h4 className="text-xs sm:text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wider">Key Features</h4>
                  <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3 text-sm sm:text-base text-gray-300">
                    {[
                      'Dynamic cart system with real-time updates',
                      'Secure payment gateway integration',
                      'Full CMS for easy content management',
                      'Responsive design for all devices'
                    ].map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 ${idx % 2 === 0 ? 'bg-purple-500' : 'bg-pink-500'} rounded-full flex-shrink-0`}></span>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['PHP', 'MySQL', 'JavaScript', 'CSS', 'Payment Integration'].map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="px-3 sm:px-4 py-1.5 sm:py-2 bg-purple-600/30 rounded-full text-xs sm:text-sm font-medium border border-purple-500/30"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-purple-500/20">
                  <p className="text-xs sm:text-sm text-purple-400 font-semibold">
                    🚀 Live in Production - Serving Real Customers
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-400">More Projects Coming Soon</h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Currently working on exciting new projects. Stay tuned for updates!
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="bg-black/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-pink-500/10 hover:border-pink-500/30 transition-all duration-300"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-400">Open to Opportunities</h3>
                <p className="text-sm sm:text-base text-gray-500">
                  Looking to collaborate on innovative projects. Let's build something amazing together.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-gradient-to-b from-purple-950/20 to-black">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 text-center"
          >
            Get In <span className="text-purple-400">Touch</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border border-purple-500/20"
          >
<p className="text-base sm:text-lg md:text-xl text-gray-300 text-center mb-8 sm:mb-12">
  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
</p>
  <form onSubmit={handleSubmit}>
    <div className="space-y-4 sm:space-y-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-xs sm:text-sm font-semibold text-purple-400 mb-2">
          Name
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="text"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white text-sm sm:text-base"
          placeholder="Your name"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-xs sm:text-sm font-semibold text-purple-400 mb-2">
          Email
        </label>
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white text-sm sm:text-base"
          placeholder="your.email@example.com"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-xs sm:text-sm font-semibold text-purple-400 mb-2">
          Message
        </label>
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          required
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-black/50 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition-colors text-white resize-none text-sm sm:text-base"
          placeholder="Tell me about your project..."
        />
      </motion.div>

      <motion.button
        type="submit"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={loading}
        className={`w-full py-3 sm:py-4 rounded-lg font-semibold shadow-lg shadow-purple-500/50 text-sm sm:text-base transition-all
          ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-pink-600"
          }`}
      >
        {loading ? "Sending..." : "Send Message"}
      </motion.button>

    </div>
  </form>

            
            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-purple-500/20">
              <div className="flex justify-center gap-4 sm:gap-6">
                <motion.a
                  href="ADD_YOUR_GITHUB_URL_HERE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 bg-purple-600/20 rounded-lg border border-purple-500/30"
                  title="GitHub"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.2, backgroundColor: "rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a
                  href="ADD_YOUR_LINKEDIN_URL_HERE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 sm:p-4 bg-purple-600/20 rounded-lg border border-purple-500/30"
                  title="LinkedIn"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.2, backgroundColor: "rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
                <motion.a
                  href="mailto:ADD_YOUR_EMAIL_HERE"
                  className="p-3 sm:p-4 bg-purple-600/20 rounded-lg border border-purple-500/30"
                  title="Email"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.2, backgroundColor: "rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail size={20} className="sm:w-6 sm:h-6" />
                </motion.a>
              </div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-center text-gray-400 mt-4 sm:mt-6 text-sm sm:text-base"
              >
                Karachi, Sindh, Pakistan
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-8 px-6 border-t border-purple-500/20"
      >
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 Muhammad Ashhad. Built with React, Tailwind CSS & Framer Motion.</p>
        </div>
      </motion.footer>
    </div>
  );
}