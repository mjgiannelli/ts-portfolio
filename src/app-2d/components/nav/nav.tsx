import React, { useState, useEffect } from 'react';
import './nav.scss';
import ToggleSwitch from '../toggle-switch/toggle-switch';

interface NavProps {
  navLinks: { name: string }[];
  selectedNavLink: string;
  setSelectedNavLink: (link: string) => void;
}

const Nav: React.FC<NavProps> = ({ selectedNavLink, setSelectedNavLink }) => {
  const [toggled, setToggled] = useState<boolean>(false);

  useEffect(() => {
    document.title = selectedNavLink;
  }, [selectedNavLink]);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const htmlEl = document.querySelector('html');
    const isChecked = event.target.checked;
    setToggled(isChecked);

    if (htmlEl) {
      htmlEl.setAttribute('theme', !isChecked ? 'Dark' : 'Light');
    }
  };

  return (
    <header className="box">
      <div id="theme-toggle-div" className="row">
        <ToggleSwitch toggled={toggled} handleToggle={handleToggle} />
      </div>
      <div className="row">
        <nav className="col-7">
          <div className="box">
            <ul id="nav-links" className="row">
              {['About', 'Portfolio', 'Contact', 'Resume'].map((link) => (
                <li key={link} className="col-2">
                  <a
                    className={selectedNavLink === link ? 'navActive' : ''}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setSelectedNavLink(link)}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <hr />
    </header>
  );
};

export default Nav;
