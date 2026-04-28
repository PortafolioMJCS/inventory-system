import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  action: string;
  user: string;
  data: any;
  created_at: Date;
}

const LogSchema: Schema = new Schema({
  action: { type: String, required: true },
  user: { type: String, required: true },
  data: { type: Object, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model<ILog>('Log', LogSchema);