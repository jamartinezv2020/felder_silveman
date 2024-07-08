// src/services/studentService.ts

import axios from '../api/axios';
import { Student } from '../models/Student';

export const createStudent = async (student: { name: string; email: string; learningStyle: string[] }) => {
  const response = await axios.post('/api/students', student);
  return response.data as Student;
};

export const getStudents = async () => {
  const response = await axios.get('/students');
  return response.data;
};

export const getStudentById = async (id: string) => {
  const response = await axios.get(`/students/${id}`);
  return response.data;
};



export const updateStudent = async (id: string, student: { name: string; email: string; learningStyle?: string[] }) => {
  const response = await axios.put(`/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: string) => {
  const response = await axios.delete(`/students/${id}`);
  return response.data;
};

export const classifyLearningStyle = async (responses: number[]) => {
  const response = await axios.post('/students/classify', { responses });
  return response.data;
};
