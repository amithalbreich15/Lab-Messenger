// RepeatedResearcherPage4.js
import React from 'react';
import ResearcherPage4 from '../screens/ResearcherPage4.js';

const RepeatedResearcherPage4 = ({ route }) => {
  const { selectedMessages } = route.params;
  const pages = [];

  for (let i = 0; i < selectedMessages; i++) {
    pages.push(<ResearcherPage4 key={i} />);
  }

  return <>{pages}</>;
};

export default RepeatedResearcherPage4;
