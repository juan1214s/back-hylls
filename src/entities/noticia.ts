import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('noticia')
export class Noticia extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id_noticia: number

    @Column({type: 'varchar', length: 1000})
    imagen: string

    @Column({type: 'varchar', length: 1000})
    titulo: string

    @Column({type: 'varchar', length: 1000})
    descripcion_corta: string

    @Column({type: 'varchar', length: 8000})
    descripcion_larga: string

    @Column({type: "date"})
    fecha: Date

}