import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    const todo = await this.prisma.todo.create({
      data,
    });
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany();
    return todos;
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.prisma.todo.findUnique({
      where: { id },
    });
    return todo;
  }

  async update(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
    const todo = await this.prisma.todo.update({
      where: { id },
      data,
    });
    return todo;
  }

  async remove(id: number): Promise<string> {
    return `This action removes a #${id} todo`;
  }
}
