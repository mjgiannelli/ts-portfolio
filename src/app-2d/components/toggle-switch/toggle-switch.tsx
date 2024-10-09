import React from 'react';
import './toggle-switch.scss';

interface ToggleSwitchProps {
  toggled: boolean;
  handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  toggled,
  handleToggle,
}) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={toggled} onChange={handleToggle} />
      <span className="switch"></span>
      <span className="text"></span>
    </label>
  );
};

export default ToggleSwitch;
