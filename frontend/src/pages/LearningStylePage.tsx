import React, { useState } from 'react';
import LearningStyleForm from '../components/LearningStyleForm';
import LearningStyleResult from '../components/LearningStyleResult';

const LearningStylePage: React.FC = () => {
  const [learningStyle, setLearningStyle] = useState<string[]>([]);

  return (
    <div>
      <h1>Determine Learning Style</h1>
      <LearningStyleForm onResult={setLearningStyle} />
      {learningStyle.length > 0 && <LearningStyleResult learningStyle={learningStyle} />}
    </div>
  );
};

export default LearningStylePage;
