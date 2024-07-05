import React from 'react';

const LearningStyleResult: React.FC<{ learningStyle: string[] }> = ({ learningStyle }) => {
  return (
    <div>
      <h2>Learning Style</h2>
      <ul>
        {learningStyle.map((style, index) => (
          <li key={index}>{style}</li>
        ))}
      </ul>
    </div>
  );
};

export default LearningStyleResult;
