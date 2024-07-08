import { Router, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();

const router = Router();

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Create JWT payload
    const payload: JwtPayload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: 360000 },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
          return; // Salir de la función si hay un error
        }
        res.json({ token });
      }
    );
  } catch (error: any) { // Captura el error como tipo 'any'
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

export default router;






