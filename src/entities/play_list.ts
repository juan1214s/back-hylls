import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ImagenPlaylist } from "./imagenPlayList";

@Entity('play_list')
export class Play_list extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id_playlist: number;

    @Column({ type: 'varchar', length: 1000 })
    enlace_spotify: string;

    @Column({ type: 'varchar', length: 1000 })
    enlace_applemusic: string;

    @Column({ type: 'varchar', length: 1000 })
    nombre_playlist: string;

    @Column({ type: 'varchar', length: 5000 })
    tipo: string;

    @OneToMany(() => ImagenPlaylist, imagenPlaylist => imagenPlaylist.playlist)
    imagenes: ImagenPlaylist[];
}
