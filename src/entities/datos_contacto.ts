import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('datos_de_contacto')
export class Datos_de_contacto{

    @PrimaryGeneratedColumn()
    Id_contacto: number

    @Column({type: 'varchar', length: 1000})
    asunto: string

    @Column({type: 'varchar', length: 1000})
    nombre: string

    @Column({type: 'varchar', length: 1000})
    email: string

    @Column({type: 'varchar', length: 5000})
    contenido: string

    @Column({type: 'tinyint'})
    spam: number

}