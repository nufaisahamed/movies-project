// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation Variants
const footerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2, // Stagger child animations
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const linkVariants = {
  hover: {
    scale: 1.05,
    color: '#A68B5D',
    transition: { duration: 0.3 },
  },
};

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 6,
    color: '#A68B5D',
    transition: { duration: 0.3, type: 'spring', stiffness: 300 },
  },
};

const Footer = () => {
  return (
    <motion.footer
      className="bg-[#2A3232] text-[#F5F5F5] py-12 px-6 shadow-inner"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Section */}
        <motion.div variants={sectionVariants} className="flex flex-col items-center md:items-start">
          <motion.h2
            className="text-3xl font-semibold tracking-wide text-[#F5F5F5] mb-4"
            whileHover={{ scale: 1.05, color: '#A68B5D' }}
            transition={{ duration: 0.3 }}
          >
            CineSphere
          </motion.h2>
          <p className="text-sm text-gray-400 text-center md:text-left">
            Your gateway to the world of cinema. Explore movies, genres, and more.
          </p>
        </motion.div>

        {/* Navigation Links */}
        <motion.div variants={sectionVariants} className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-medium text-[#F5F5F5] mb-4 tracking-wide">Quick Links</h3>
          <ul className="space-y-3 text-center md:text-left">
            {['/', '/latest', '/categories', '/trending'].map((path, index) => (
              <motion.li key={index} variants={sectionVariants}>
                <Link
                  to={path}
                  className="text-sm text-gray-400"
                >
                  <motion.span
                    whileHover="hover"
                    variants={linkVariants}
                    className="relative inline-block"
                  >
                    {path === '/' ? 'Home' : path.split('/')[1].charAt(0).toUpperCase() + path.split('/')[1].slice(1)}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#A68B5D]"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </motion.span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Social Media & Contact */}
        <motion.div variants={sectionVariants} className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-medium text-[#F5F5F5] mb-4 tracking-wide">Connect With Us</h3>
          <div className="flex gap-6 mb-4">
            {[
              { href: 'https://facebook.com', icon: <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /> },
              { href: 'https://twitter.com', icon: <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .389.045.757.127 1.126-3.862-.193-7.295-2.043-9.602-4.818-.401.69-.628 1.491-.628 2.351 0 1.623.827 3.055 2.083 3.894-.766-.024-1.488-.234-2.115-.583v.06c0 2.267 1.61 4.156 3.747 4.584-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.594 1.854 2.313 3.204 4.354 3.24-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.255 0-.202-.005-.403-.014-.604.91-.658 1.698-1.478 2.323-2.41z" /> },
              { href: 'https://instagram.com', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.326 3.608 1.301.975.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-1.301.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85 0 3.204.012 3.584.07 4.85.062 1.366.326 2.633 1.301 3.608 1.301.975 1.24 2.242 1.301 3.608.058 1.266.07 1.646.07 4.85 0 3.204-.012 3.584-.07 4.85-.062 1.366-.326 2.633-1.301 3.608-1.301.975-1.24 2.242-1.301 3.608-.058 1.266-.07 1.646-.07 4.85 0 3.204z" /> },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400"
                whileHover="hover"
                variants={iconVariants}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  {social.icon}
                </svg>
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-gray-400">Contact: nufaist37@gmail.com</p>
          <p className="text-sm text-gray-400">CEO: Nufais Ahamed</p>
        </motion.div>
      </motion.div>

      {/* Copyright */}
      <motion.div
        className="mt-10 text-center text-sm text-gray-500 border-t border-[#3F4B4B] pt-6"
        variants={sectionVariants}
      >
        © {new Date().getFullYear()} CineSphere. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;