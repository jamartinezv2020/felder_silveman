import React from 'react';

interface StudentListProps {
  students: any[];
  onEdit: (student: any) => void;
  onDelete: (studentId: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.email}
            <button onClick={() => onEdit(student)}>Edit</button>
            <button onClick={() => onDelete(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;

