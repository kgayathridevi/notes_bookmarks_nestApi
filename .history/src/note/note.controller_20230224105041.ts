import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { jwtGuard } from '../auth/guard';
import { createNoteDto } from './dto';
import { NoteService } from './note.service';


@UseGuards(jwtGuard)
@Controller('note')
export class NoteController {
    constructor(private noteservice:NoteService ) {}

    @Get()
    getnotes(@GetUser('id') userId: number) {
        return this.noteservice.getnotes(userId,);
    }

    @Get(':id')
    getnotesbyid(
        @GetUser('id') userId: number, 
        @Param('id', ParseIntPipe) noteid:number,
    ) {
        return this.noteservice.getnotesbyid(
            userId,
            noteid,
        );
    }

    @Post()
    createnotes(
        @GetUser('id') userId: number,
        @Body() dto:createNoteDto,
    ){
        return this.noteservice.createnotes(
            userId,
            dto,
        );
    }

    @Patch(':id')
    editnotes(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) noteid:number,
        @Body() dto:createNoteDto,) {
        return this.noteservice.editnotes(
            userId,
            noteid,
            dto,
        );
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deletenotes(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) noteid:number,
    ) {
        return this.noteservice.deletenotes(
            userId,
            noteid,
        );
    }
}
