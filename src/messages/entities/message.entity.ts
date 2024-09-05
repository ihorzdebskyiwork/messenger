import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  workspaceId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  date: Date;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
