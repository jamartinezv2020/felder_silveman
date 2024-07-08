import { Request, Response } from 'express';
import * as studentService from '../services/studentService';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await studentService.getStudentById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const newStudent = await studentService.createStudent(req.body);
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deletedStudent = await studentService.deleteStudent(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const classifyLearningStyle = (req: Request, res: Response) => {
  try {
    const learningStyle = studentService.classifyLearningStyle(req.body.responses);
    res.status(200).json({ learningStyle });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

