import mongoose, { Schema, Document } from 'mongoose';

// Definición de la interfaz para el estudiante
export interface Student {
  name: string;
  age: number;
}

// Definición del tipo de documento del estudiante
export type StudentDocument = Document & Student;

// Esquema del estudiante
const studentSchema = new Schema<Student>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

// Modelo de Mongoose para el estudiante
const Student = mongoose.model<StudentDocument>('Student', studentSchema);

export default Student;



