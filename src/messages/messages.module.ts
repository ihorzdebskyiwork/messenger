import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceSchema } from 'src/workspaces/entities/workspace.entity';
import { MessageSchema } from './entities/message.entity';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Message', schema: MessageSchema },
      { name: 'Workspace', schema: WorkspaceSchema },
    ]),
    JwtModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
