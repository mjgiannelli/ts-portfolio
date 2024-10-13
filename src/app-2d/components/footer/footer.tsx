import React from 'react';
import { SocialIcon } from 'react-social-icons';
import './footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="box">
      <hr />
      <div className="row">
        <h5 className="col-10">
          <span>&copy;</span> 2021 Designs by Gia, LLC.
        </h5>
        <div id="icon-div" className="row">
          <div className="social-icons">
            <SocialIcon url="https://github.com/mjgiannelli" />
            <SocialIcon url="https://www.linkedin.com/in/mark-giannelli-mba-458585108/" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
