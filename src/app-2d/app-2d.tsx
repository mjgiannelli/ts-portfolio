import { useState } from 'react';
import Contact from './views/contact/contact.view';
import './app-2d.scss';
import Portfolio from './views/portfolio/portfolio.view';
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import Resume from './views/resume/resume.view';
import About from './views/about/about.view';

const App2D = () => {
  const [navLinks] = useState([
    {
      name: 'About',
    },
    {
      name: 'Portfolio',
    },
    {
      name: 'Contact',
    },
    {
      name: 'Resume',
    },
  ]);

  const [selectedNavLink, setSelectedNavLink] = useState(navLinks[0].name);
  return (
    <div>
      {/* <Nav
        navLinks={navLinks}
        selectedNavLink={selectedNavLink}
        setSelectedNavLink={setSelectedNavLink}
      /> */}
      <main>
        {selectedNavLink === 'About' ? (
          <>
            <About />
          </>
        ) : selectedNavLink === 'Portfolio' ? (
          <>
            <Portfolio />
          </>
        ) : selectedNavLink === 'Contact' ? (
          <>
            <Contact />
          </>
        ) : (
          <>
            <Resume />
          </>
        )}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App2D;
