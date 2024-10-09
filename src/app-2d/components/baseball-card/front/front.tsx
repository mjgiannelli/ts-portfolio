import React from 'react';
import './front.scss';

interface BaseballCardFrontProps {
  handleClick: () => void;
}

const BaseballCardFront: React.FC<BaseballCardFrontProps> = ({
  handleClick,
}) => {
  return (
    <div>
      <div className="card-container" onClick={handleClick}>
        <div id="front-card-body">
          <div className="topps-div">
            <img
              className="topps"
              src="https://www.logosurfer.com/wp-content/uploads/2018/03/topps-logo_0.png"
              alt="Topps Logo"
            />
          </div>
          <div id="front-card-signature-div">
            <div id="card-signature">
              <p id="print-name">MARK GIANNELLI</p>
              <p id="cursive-name">Mark Giannelli</p>
            </div>
          </div>
        </div>
      </div>
      <p id="text-front" className="col-10">
        Flip the card over to see GitHub Stats!
      </p>
    </div>
  );
};

export default BaseballCardFront;
