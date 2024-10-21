import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  user: mongoose.Types.ObjectId;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

export default mongoose.model<ITodo>('Todo', TodoSchema);