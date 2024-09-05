import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkspaceDocument } from 'src/workspaces/entities/workspace.entity';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message, MessageDocument } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<MessageDocument>,
    @InjectModel('Workspace')
    private readonly workspaceModel: Model<WorkspaceDocument>,
  ) {}
  async create(createMessageDto: any) {
    const message = await this.messageModel.create(createMessageDto);

    await this.workspaceModel.findOneAndUpdate(
      { _id: createMessageDto.workspaceId },
      {
        $addToSet: { messages: message._id },
      },
      { new: true },
    );

    return message;
  }

  findAll() {
    return this.messageModel.find().exec();
  }

  async searchMessages(
    startDate: Date,
    endDate: Date,
    minLikes: number,
  ): Promise<Message[]> {
    const query: any = {};

    if (startDate && endDate) {
      query.date = { $gte: startDate, $lte: endDate };
    }
    if (minLikes) {
      query.likes = { $gte: minLikes };
    }

    return this.messageModel.find(query).exec();
  }

  findOne(id: string) {
    return this.messageModel.findById(id).exec();
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    return this.messageModel.findByIdAndUpdate(id, updateMessageDto).exec();
  }

  remove(id: string) {
    return this.messageModel.findByIdAndDelete(id).exec();
  }
}
