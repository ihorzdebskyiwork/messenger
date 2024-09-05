import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.messagesService.findAll();
  }

  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchMessages(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('minLikes') minLikes: number,
  ): Promise<Message[]> {
    return this.messagesService.searchMessages(startDate, endDate, minLikes);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
