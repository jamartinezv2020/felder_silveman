import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface StudentFormProps {
  student: any | null;
  fetchStudents: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, fetchStudents }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setEmail(student.email);
    } else {
      setName('');
      setEmail('');
    }
  }, [student]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (student) {
        await axios.put(`${process.env.REACT_APP_API_URL}/students/${student._id}`, { name, email });
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/students`, { name, email });
      }
      fetchStudents();
    } catch (error) {
      console.error('Error saving student', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{student ? 'Edit Student' : 'Add Student'}</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button type="submit">{student ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default StudentForm;

