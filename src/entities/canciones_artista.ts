import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"
import { Album_artista } from "./album_artista"

@Entity('canciones_artista')
export class Canciones_artista{

    @PrimaryGeneratedColumn()
    Id_cancion: number

    @Column({type: 'varchar', length: 1000})
    cancion: string

    @ManyToOne(()=> Album_artista, album_artista => album_artista.cancion)
    artista_album: Album_artista
    
}