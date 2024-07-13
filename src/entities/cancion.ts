import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"

@Entity('cancion')
export class Cancion{

    @PrimaryGeneratedColumn()
    Id_cancion: number

    @Column({type: 'varchar', length: 1000})
    cancion: string
    
}