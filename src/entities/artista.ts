import { Column, Entity, PrimaryGeneratedColumn, OneToMany, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { Album_artista } from "./album_artista"
import { video_artista } from "./videos_artista"
import { Banner } from "./banner"
import { BannerMobil } from "./bannerMobil"
import { Foto } from "./foto"

@Entity('artista')
export class Artista extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id_artista: number;

    @Column({ type: 'varchar', length: 1000 })
    nombre: string;

    @Column({ type: 'varchar', length: 5000 })
    biografia: string;

    @Column({ type: 'varchar', length: 1000 })
    facebook: string;

    @Column({ type: 'varchar', length: 1000 })
    twitter: string;

    @Column({ type: 'varchar', length: 1000 })
    instagram: string;

    @Column({ type: 'varchar', length: 1000 })
    youtube: string;

    @OneToMany(() => Album_artista, artista_album => artista_album.artista, { cascade: true })
    artista_album: Album_artista[];

    @OneToMany(() => video_artista, videoArtista => videoArtista.artista, { cascade: true })
    videoArtista: video_artista[];

    @OneToMany(() => Banner, banner => banner.artista, { cascade: true })
    banner: Banner[]

    @OneToMany(()=> Foto, foto => foto.artista, { cascade: true })
    foto: Foto[]

    @OneToMany(() => BannerMobil, bannerMobil => bannerMobil.artista, { cascade: true })
    bannerMobil: BannerMobil[];

}
