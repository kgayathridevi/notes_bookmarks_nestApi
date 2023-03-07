import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createNoteDto, EditNoteDto } from './dto';

@Injectable()
export class NoteService {
    constructor(private prisma:PrismaService){}
    getnotes(userId: number) {
        return this.prisma.note.findMany({
            where: {
              userId,
            },
          });
    }
    
    getnotesbyid(
        userId: number, 
        noteId: number,
    ) {
        return this.prisma.note.findFirst({
            where: {
              id: noteId,
              userId,
            },
        });
    }
   
    async createnotes( 
        userId: number,
        dto: createNoteDto,
    ){
      console.log("userid", userId);
      console.log("data", dto)
        const notes = await this.prisma.note.create({
        data: {
            updatedAt: new Date,
            userId,
            ...dto,
        },
      });

    return notes;
    }

    
    async editnotes(
        userId: number,
        noteId: number,
        dto: EditNoteDto,
    ) {
        const note = await this.prisma.note.findUnique({
        where: {
          id: noteId,
        },
      });

      if (!noteId || note.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    return this.prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        ...dto,
      },
    });
    }

    async deletenotes( userId: number,
        noteId: number,) {
            const note = await this.prisma.note.findUnique({
        where: {
          id: noteId,
        },
      });
      if (!note || note.userId !== userId)
      throw new ForbiddenException(
        'Access to resources denied',
      );

    await this.prisma.note.delete({
      where: {
        id: noteId,
      },
    });
    }
}
