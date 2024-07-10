import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('play_list')
export class Play_list{

    @PrimaryGeneratedColumn()
    Id_playlist: number

    @Column({type: 'varchar', length: 1000})
    enlace_spotify: string

    @Column({type: 'varchar', length: 1000})
    enlace_applemusic: string

    @Column({type: 'varchar', length: 1000})
    nombre_playlist: string

    @Column({type: 'varchar', length: 5000})
    tipo: string

    @Column({type: 'varchar', length: 5000})
    foto_playlist: string

}