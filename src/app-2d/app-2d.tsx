import { useState } from 'react';
import Contact from './views/contact/contact.view';
import './app-2d.scss';
import Portfolio from './views/portfolio/portfolio.view';

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

  const [selectedNavLink, setSelectedNavLink] = useState(navLinks[1].name);
  return (
    <main>
      {selectedNavLink === 'About' ? (
        <></>
      ) : selectedNavLink === 'Portfolio' ? (
        <>
          <Portfolio />
        </>
      ) : selectedNavLink === 'Contact' ? (
        <>
          <Contact />
        </>
      ) : (
        <></>
      )}
    </main>
  );
};

export default App2D;
