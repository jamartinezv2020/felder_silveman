import React, { useState } from 'react';
import { Student } from '../models/Student';

interface StudentFormProps {
  onSubmit: (student: { name: string; email: string; learningStyle: string[] }) => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [learningStyle, setLearningStyle] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, learningStyle });
    setName('');
    setEmail('');
    setLearningStyle([]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={learningStyle.join(', ')}
        onChange={(e) => setLearningStyle(e.target.value.split(', '))}
        placeholder="Learning Styles (comma separated)"
      />
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;



