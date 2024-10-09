import React from 'react';
import './resume.view.scss';

interface Skill {
  name: string;
}

const Resume: React.FC = () => {
  const skills: Skill[] = [
    { name: 'HTML' },
    { name: 'CSS' },
    { name: 'SASS' },
    { name: 'JavaScript' },
    { name: 'C#' },
    { name: 'React' },
    { name: 'Node.js' },
    { name: 'Express' },
    { name: 'MongoDB' },
    { name: 'MySQL' },
    { name: 'Dotnet' },
    { name: 'WASM' },
    { name: 'Blazor' },
  ];

  return (
    <section>
      <h2 className="title">Resume</h2>
      <div className="box">
        <div id="resume-link-div" className="row">
          <a
            id="resume-link"
            href="https://drive.google.com/uc?export=download&id=1PFVSKK72je7FWJG1TbOVrfImTiEODm-B"
            download
          >
            Click Me To Download Resume 😃
          </a>
        </div>
        <h3>Proficiencies</h3>
        <div id="skills-div" className="row">
          <ul>
            {skills.map((skill, index) => (
              <li className="skill" key={index}>
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Resume;
