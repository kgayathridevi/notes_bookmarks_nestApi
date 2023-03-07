import { IsString, IsArray } from "class-validator"

export class createNoteDto {
    @IsString()
    title: string
    
    @IsString()
    description:string

    @IsString()
    category:string
    
    @IsArray()
    tags:string[]
}