import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { ImagenNoticia } from "./imagenNoticia"


@Entity('noticia')
export class Noticia extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id_noticia: number

    @Column({type: 'varchar', length: 1000})
    titulo: string

    @Column({type: 'varchar', length: 1000})
    descripcion_corta: string

    @Column({type: 'varchar', length: 8000})
    descripcion_larga: string

    @Column({type: "date"})
    fecha: Date

    @OneToMany(()=> ImagenNoticia, ImagenNoticia => ImagenNoticia.noticia)
    imagenes: ImagenNoticia[]

}