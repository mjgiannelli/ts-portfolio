import React from 'react';
import ProjectList from '../../components/project-list/project-list';

const Portfolio: React.FC = () => {
  return (
    <section className="box">
      <h2 className="title">Portfolio</h2>
      <h2 style={{ marginBottom: '5rem', color: 'red', textAlign: 'center' }}>
        Please give time for Render server to kick on when visiting the deployed
        site. Could take up to 5 mins, but hey it's free!
      </h2>
      <ProjectList />
    </section>
  );
};

export default Portfolio;
