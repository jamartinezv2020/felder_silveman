import React, { useEffect, useState } from 'react';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';
import { Student } from '../models/Student';
import { getStudents, createStudent, deleteStudent } from '../services/studentService';

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentsData = await getStudents();
      setStudents(studentsData);
    };
    fetchData();
  }, []);

  const handleAddStudent = async (student: { name: string; email: string; learningStyle: string[] }) => {
    const newStudent = await createStudent(student);
    setStudents([...students, newStudent]);
  };

  const handleDeleteStudent = async (studentId: string) => {
    await deleteStudent(studentId);
    setStudents(students.filter(student => student._id !== studentId));
  };

  return (
    <div>
      <h1>Student Management App</h1>
      <StudentForm onSubmit={handleAddStudent} />
      <StudentList students={students} onDelete={handleDeleteStudent} />
    </div>
  );
};

export default StudentsPage;






