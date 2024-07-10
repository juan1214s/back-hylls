import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm"
import { Artista } from "./artista"
import { Canciones_artista } from "./canciones_artista"

@Entity('album_artista')
export class Album_artista{

    @PrimaryGeneratedColumn()
    Id_album: number

    @Column({type: 'varchar', length: 5000})
    nombre_album: string

    @Column({type: "date"})
    fecha_album: Date

    @Column({type: 'varchar', length: 5000})
    foto_album: string

    @ManyToOne(()=> Artista, artista => artista.artista_album)
    artista: Artista
    
    @OneToMany(()=> Canciones_artista, cancion => cancion.artista_album, {cascade: true})
    cancion: Canciones_artista[]

}