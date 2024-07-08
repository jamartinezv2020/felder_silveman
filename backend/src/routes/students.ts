import { Router, Request, Response } from 'express';
import Student from '../models/studentModel';

const router = Router();

// @route   GET api/students
// @desc    Get all students
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/students
// @desc    Create a new student
// @access  Public
router.post('/', async (req: Request, res: Response) => {
  const { name, email, learningStyle } = req.body;

  try {
    const newStudent = new Student({
      name,
      email,
      learningStyle,
    });

    await newStudent.save();

    res.json(newStudent);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/students/:id
// @desc    Update a student by ID
// @access  Public
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, learningStyle } = req.body;

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    student.name = name;
    student.email = email;
    student.learningStyle = learningStyle;

    await student.save();

    res.json(student);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/students/:id
// @desc    Delete a student by ID
// @access  Public
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    await student.deleteOne();

    res.json({ msg: 'Student removed' });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

export default router;













