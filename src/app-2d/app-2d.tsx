import { useState } from 'react';
import Contact from './views/contact/contact.view';
import './app-2d.scss';
import Portfolio from './views/portfolio/portfolio.view';
import Nav from './components/nav/nav';
import Footer from './components/footer/footer';
import Resume from './views/resume/resume.view';
import About from './views/about/about.view';

interface App2DProps {
  colorTheme: string;
}

const App2D: React.FC<App2DProps> = ({ colorTheme }) => {
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
      <Nav
        navLinks={navLinks}
        selectedNavLink={selectedNavLink}
        setSelectedNavLink={setSelectedNavLink}
        colorTheme={colorTheme}
      />
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
      <Footer />
    </div>
  );
};

export default App2D;
