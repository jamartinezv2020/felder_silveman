import React, { useState } from 'react';
import { classifyLearningStyle } from '../services/api';

const LearningStyleForm: React.FC<{ onResult: (learningStyle: string[]) => void }> = ({ onResult }) => {
  const [responses, setResponses] = useState<number[]>(new Array(44).fill(0));

  const handleChange = (index: number, value: number) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await classifyLearningStyle(responses);
    onResult(result.learningStyle);
  };

  return (
    <form onSubmit={handleSubmit}>
      {responses.map((response, index) => (
        <div key={index}>
          <label>Question {index + 1}</label>
          <input
            type="number"
            value={response}
            onChange={(e) => handleChange(index, Number(e.target.value))}
            required
          />
        </div>
      ))}
      <button type="submit">Classify</button>
    </form>
  );
};

export default LearningStyleForm;

