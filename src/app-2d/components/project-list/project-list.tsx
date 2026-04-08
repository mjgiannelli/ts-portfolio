import { useState } from 'react';
import './project-list.scss';
import { formatTitle } from '../../../utilties/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket,
  faLightbulb,
  faCode,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';

interface Project {
  name: string;
  deploy: string;
  problem_solved: string;
  technologies_used: string;
  github: string;
}

const ProjectList = (): JSX.Element => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeQuadrant, setActiveQuadrant] = useState<
    'problem' | 'stack' | null
  >(null);
  const [projects] = useState<Project[]>([
    {
      name: 'board-reactions',
      deploy: 'https://board-reactions.onrender.com/',
      problem_solved: 'Connecting board game enthusiasts.',
      technologies_used: 'MERN Stack, JavaScript, GraphQL.',
      github: 'https://github.com/mjgiannelli/board-reactions',
    },
    {
      name: 'find-my-books',
      deploy: 'https://find-my-book.onrender.com/',
      problem_solved: 'Discovering new books to read.',
      technologies_used: 'MERN Stack, JavaScript, GraphQL.',
      github: 'https://github.com/mjgiannelli/find-my-book',
    },
    {
      name: 'shop-shop',
      deploy: 'https://shop-shop-docker.onrender.com/',
      problem_solved: 'Building a simple E-Commerce website.',
      technologies_used: 'MERN Stack, JavaScript, GraphQL.',
      github: 'https://github.com/mjgiannelli/shop-shop',
    },
    {
      name: 'movie-date',
      deploy: 'https://mjgiannelli.github.io/movie_date/',
      problem_solved: 'Giving couples ideas on what movies to watch.',
      technologies_used: 'JavaScript, jQuery, Client Side APIs, UI-Kit.',
      github: 'https://github.com/mjgiannelli/movie_date',
    },
    {
      name: 'weather-rain-or-shine',
      deploy: 'https://mjgiannelli.github.io/weather-rain-or-shine/',
      problem_solved:
        'Allows user to search current weather and 5-day forecast for any city.',
      technologies_used: 'JavaScript, HTML, CSS, Client Side API.',
      github: 'https://github.com/mjgiannelli/weather-rain-or-shine',
    },
  ]);

  return (
    <div id="projects" className="row">
      {projects.map((project, index) => (
        <div className="project col-4" key={index}>
          <h2>{formatTitle(project.name)}</h2>
          <div
            className="project-image-wrapper"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => {
              setHoveredIndex(null);
              setActiveQuadrant(null);
            }}
          >
            <img
              className="project_img"
              src={`/assets/images/${project.name}.png`}
              alt={project.name}
            />
            <div
              className={`project-orbit-overlay${hoveredIndex === index ? ' visible' : ''}`}
            >
              <div className="ring-container">
                {/* ── Top-left: Problem Solved ── */}
                <div
                  className="arc-quadrant q-top-left"
                  onMouseEnter={() => setActiveQuadrant('problem')}
                >
                  <div className="ring-arc" />
                  <div className="arc-icon">
                    <FontAwesomeIcon icon={faLightbulb} />
                    <span>Problem</span>
                  </div>
                </div>

                {/* ── Top-right: Deploy (link) ── */}
                <a
                  className="arc-quadrant q-top-right"
                  href={project.deploy}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveQuadrant(null)}
                >
                  <div className="ring-arc" />
                  <div className="arc-icon">
                    <FontAwesomeIcon icon={faRocket} />
                    <span>Deploy</span>
                  </div>
                </a>

                {/* ── Bottom-left: Technologies ── */}
                <div
                  className="arc-quadrant q-bottom-left"
                  onMouseEnter={() => setActiveQuadrant('stack')}
                >
                  <div className="ring-arc" />
                  <div className="arc-icon">
                    <FontAwesomeIcon icon={faCode} />
                    <span>Stack</span>
                  </div>
                </div>

                {/* ── Bottom-right: GitHub (link) ── */}
                <a
                  className="arc-quadrant q-bottom-right"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setActiveQuadrant(null)}
                >
                  <div className="ring-arc" />
                  <div className="arc-icon">
                    <FontAwesomeIcon icon={faCodeBranch} />
                    <span>GitHub</span>
                  </div>
                </a>
              </div>

              {/* ── Info panels ── */}
              <div
                className={`arc-info-panel arc-info-problem${activeQuadrant === 'problem' ? ' arc-info-visible' : ''}`}
              >
                <p className="arc-info-body">{project.problem_solved}</p>
              </div>
              <div
                className={`arc-info-panel arc-info-stack${activeQuadrant === 'stack' ? ' arc-info-visible' : ''}`}
              >
                <p className="arc-info-body">{project.technologies_used}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
