import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Image } from '@chakra-ui/react';
import styles from '../styles/Navbar.module.css';
import Logo from './Logo';

const Links = [
  { name: 'Home', path: '/' },
  { name: 'Upload Resume', path: '/upload' },
  { name: 'Interview', path: '/interview' },
  { name: 'Results', path: '/results' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Box as={RouterLink} to="/">
            <Image 
              src="/images/logo.png"
              alt="Resume Analyzer"
              height="40px"
              className={styles.logo}
              fallback={<Logo />}
            />
          </Box>
        </div>

        <div className={styles.navLinks}>
          <div className={styles.mainLinks}>
            {Links.map((link) => (
              <RouterLink
                key={link.path}
                to={link.path}
                className={`${styles.navLink} ${
                  location.pathname === link.path ? styles.navLinkActive : ''
                }`}
              >
                {link.name}
              </RouterLink>
            ))}
          </div>
        </div>

        <div>
          <button className={styles.mobileMenuButton} onClick={toggleMenu}>
            {isOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
          <button className={styles.getStartedButton}>
            Get Started
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.mobileMenu}>
          {Links.map((link) => (
            <RouterLink
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${
                location.pathname === link.path ? styles.navLinkActive : ''
              }`}
              onClick={toggleMenu}
            >
              {link.name}
            </RouterLink>
          ))}
          <button className={styles.getStartedButton}>
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 