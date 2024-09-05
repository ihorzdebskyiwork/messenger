// src/workspaces/models/workspace.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Message } from 'src/messages/entities/message.entity';

export type WorkspaceDocument = Workspace & Document;

@Schema()
export class Workspace {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({})
  name: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }])
  messages: [Message];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
