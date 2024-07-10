import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { Artista } from "./artista"

@Entity('banner')
export class Banner extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id_banner: number;

    @Column({ type: 'varchar', length: 1000 })
    url: string;

    @Column({ type: 'varchar', length: 1000 })
    id_imgur: string;

    @ManyToOne(() => Artista, artista => artista.banner)
    artista: Artista;
    
}
