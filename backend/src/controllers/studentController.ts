import { Request, Response } from 'express';
import Student from '../models/studentModel';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const newStudent = new Student({ name, email });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ message: typedError.message });
  }
};

export const classifyLearningStyle = (req: Request, res: Response) => {
  const responses = req.body.responses; // Array of responses to the 44 questions
  const learningStyle = determineLearningStyle(responses);
  res.status(200).json({ learningStyle });
};

const determineLearningStyle = (responses: number[]): string[] => {
  if (responses.length !== 44) {
    throw new Error("Invalid number of responses. Expected 44.");
  }

  let active = 0, reflective = 0;
  let sensing = 0, intuitive = 0;
  let visual = 0, verbal = 0;
  let sequential = 0, global = 0;

  for (let i = 0; i < 44; i++) {
    const response = responses[i];

    switch (i % 4) {
      case 0: // Active/Reflective
        if (response === 1) active++;
        else reflective++;
        break;
      case 1: // Sensing/Intuitive
        if (response === 1) sensing++;
        else intuitive++;
        break;
      case 2: // Visual/Verbal
        if (response === 1) visual++;
        else verbal++;
        break;
      case 3: // Sequential/Global
        if (response === 1) sequential++;
        else global++;
        break;
      default:
        break;
    }
  }

  const learningStyle: string[] = [
    active >= reflective ? 'Active' : 'Reflective',
    sensing >= intuitive ? 'Sensing' : 'Intuitive',
    visual >= verbal ? 'Visual' : 'Verbal',
    sequential >= global ? 'Sequential' : 'Global',
  ];

  return learningStyle;
};

