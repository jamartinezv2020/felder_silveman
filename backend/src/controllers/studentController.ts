import { Request, Response } from 'express';
import Student from '../models/Student';

// @desc    Get all students
// @route   GET /api/students
// @access  Public
export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get student by ID
// @route   GET /api/students/:id
// @access  Public
export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.status(200).json(student);
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Public
export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, learningStyle } = req.body;

    const newStudent = new Student({
      name,
      email,
      learningStyle,
    });

    const student = await newStudent.save();
    res.status(201).json(student);
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update student by ID
// @route   PUT /api/students/:id
// @access  Public
export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, learningStyle } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, learningStyle },
      { new: true, runValidators: true }
    );

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.status(200).json(student);
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete student by ID
// @route   DELETE /api/students/:id
// @access  Public
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      res.status(404).json({ message: 'Student not found' });
    } else {
      res.status(200).json({ message: 'Student removed' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

