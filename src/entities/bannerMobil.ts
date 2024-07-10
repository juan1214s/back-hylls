import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Artista } from "./artista";

@Entity('bannerMobil')
export class BannerMobil extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id_bannerMobil: number;

    @Column({ type: 'varchar', length: 1000 })
    url: string;

    @Column({ type: 'varchar', length: 1000 })
    id_imgur: string;

    @ManyToOne(() => Artista, artista => artista.bannerMobil, { onDelete: 'CASCADE' })
    artista: Artista;

}
