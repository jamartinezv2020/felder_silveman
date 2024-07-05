// src/pages/StudentsPage.tsx

import React, { useState, useEffect } from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import { fetchStudents, addStudent, deleteStudent } from '../services/api';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents()
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleAddStudent = (formData: any) => {
    addStudent(formData)
      .then((newStudent) => {
        setStudents([...students, newStudent]);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleDeleteStudent = (studentId: string) => {
    deleteStudent(studentId)
      .then(() => {
        setStudents(students.filter((student) => student._id !== studentId));
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching students: {error}</p>;

  return (
    <div>
      <h1>Student Management App</h1>
      <StudentForm onSubmit={handleAddStudent} />
      <StudentList students={students} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default StudentsPage;




