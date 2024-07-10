import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('videos_musicales')
export class Videos_musicales{

    @PrimaryGeneratedColumn()
    Id_video: number

    @Column({type: 'varchar', length: 1000})
    video: string

    @Column({type: 'varchar', length: 1000})
    titulo: string

}
