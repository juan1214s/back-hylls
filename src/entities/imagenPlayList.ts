import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Play_list } from "./play_list";

@Entity('imagenPlaylist')
export class ImagenPlaylist extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id_imagen: number;

    @Column({ type: 'varchar', length: 1000 })
    url: string;

    @Column({ type: 'varchar', length: 1000 })
    id_imgur: string;

    @ManyToOne(() => Play_list, playlist => playlist.imagenes)
    @JoinColumn({ name: 'playlistId' })  // Asegúrate de que la columna FK se llame playlistId
    playlist: Play_list;
}
