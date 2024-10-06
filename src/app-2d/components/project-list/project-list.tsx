import { useState } from 'react';
import './project-list.scss';
import { formatTitle } from '../../../utilties/utils';

// Define the type for each project object
interface Project {
  name: string;
  deploy: string;
  problem_solved: string;
  technologies_used: string;
  github: string;
}

const ProjectList = (): JSX.Element => {
  // Define the state with the array of projects typed as Project[]
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
          <div>
            <img
              className="project_img"
              src={`/assets/images/${project.name}.png`}
              alt={project.name}
            />
            <div className="project_description border project-content">
              <div className="row project_details">
                <div className="col-10">
                  <p className="project-name">{formatTitle(project.name)}</p>
                </div>
                <div className="col-10">
                  <p className="project-prob">{project.problem_solved}</p>
                </div>
                <div className="col-10">
                  <p className="project-tech">
                    Tech Used: {project.technologies_used}
                  </p>
                </div>
                <div className="col-10">
                  <a
                    className="project-links"
                    href={project.deploy}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Deployed App Link
                  </a>
                </div>
                <div className="col-10">
                  <a
                    className="project-links"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Repo Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
