// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

export const createStudent = async (studentData: any) => {
  const response = await axios.post(`${API_URL}/students`, studentData);
  return response.data;
};

export const deleteStudent = async (studentId: string) => {
  const response = await axios.delete(`${API_URL}/students/${studentId}`);
  return response.data;
};

export const classifyLearningStyle = async (responses: number[]) => {
  const response = await axios.post(`${API_URL}/classify`, { responses });
  return response.data;
};
