import mongoose, { Schema, Model } from 'mongoose';

export interface IStudent {
    name: string;
    student_id: string;
    major: string;
    semester: number;
    email: string;
    created_at: Date;
}

const StudentSchema: Schema<IStudent> = new Schema({
    name: { type: String, required: true },
    student_id: { type: String, required: true, unique: true },
    major: { type: String, required: true },
    semester: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    created_at: { type: Date, default: Date.now },
});

const Student: Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);

export default Student;
