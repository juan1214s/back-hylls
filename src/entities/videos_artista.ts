import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { Artista } from "./artista"

@Entity('video_artista')
export class video_artista{

    @PrimaryGeneratedColumn()
    Id_video_artista: number

    @Column({type: 'varchar', length: 1000})
    video_artista: string

    @ManyToOne(()=> Artista, artista => artista.videoArtista)
    artista: Artista
}
