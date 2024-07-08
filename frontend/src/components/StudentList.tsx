// En tu componente StudentList.tsx u otro componente que muestre la lista de estudiantes
import React from 'react';
import { Student } from '../models/Student'; // Asegúrate de importar la interfaz Student desde la ubicación correcta

interface StudentListProps {
  students: Student[];
  onDelete: (studentId: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onDelete }) => {
  return (
    <div>
      <h1>Student List</h1>
      {students.map((student) => (
        <div key={student._id}>
          <h2>{student.name}</h2>
          <p>Email: {student.email}</p>
          <p>Learning Style: {student.learningStyle.join(', ')}</p> {/* Usando join porque learningStyle es un array de strings */}
          <button onClick={() => onDelete(student._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default StudentList;
