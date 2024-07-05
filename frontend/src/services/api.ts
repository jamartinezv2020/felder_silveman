import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getStudents = async () => {
  const response = await axios.get(`${API_URL}/students`);
  return response.data;
};

export const getStudentById = async (id: string) => {
  const response = await axios.get(`${API_URL}/students/${id}`);
  return response.data;
};

export const createStudent = async (student: { name: string; email: string }) => {
  const response = await axios.post(`${API_URL}/students`, student);
  return response.data;
};

export const updateStudent = async (id: string, student: { name?: string; email?: string }) => {
  const response = await axios.put(`${API_URL}/students/${id}`, student);
  return response.data;
};

export const deleteStudent = async (id: string) => {
  const response = await axios.delete(`${API_URL}/students/${id}`);
  return response.data;
};

export const classifyLearningStyle = async (responses: number[]) => {
  const response = await axios.post(`${API_URL}/students/classify`, { responses });
  return response.data;
};
