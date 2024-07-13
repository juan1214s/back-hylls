import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, BaseEntity } from "typeorm"
import { Artista } from "./artista"
import { Canciones_artista } from "./canciones_artista"
import { FotoAlbum } from "./foto_album"

@Entity('album_artista')
export class Album_artista extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id_album: number

    @Column({type: 'varchar', length: 5000})
    nombre_album: string

    @Column({type: "date"})
    fecha_album: Date

    @ManyToOne(()=> Artista, artista => artista.artista_album)
    artista: Artista
    
    @OneToMany(()=> Canciones_artista, cancion => cancion.artista_album, {cascade: true})
    cancion: Canciones_artista[]

    @OneToMany(()=> FotoAlbum, fotoAlbum =>fotoAlbum.albumArtista)
    fotoAlbum: FotoAlbum[]

}
