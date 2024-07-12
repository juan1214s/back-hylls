import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { Album_artista } from "./album_artista"

@Entity('foto_album')
export class FotoAlbum extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id_foto: number

    @Column({type: 'varchar', length: 1000})
    foto: string

    @Column({type: 'varchar', length: 1000})
    id_imgur: string

    @ManyToOne(()=> Album_artista, albumArtista => albumArtista.fotoAlbum)
    albumArtista: Album_artista
    
}