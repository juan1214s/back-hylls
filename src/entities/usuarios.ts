import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity('usuarios')
export class Usuarios{

    @PrimaryGeneratedColumn()
    Id_usuario: number

    @Column({type: 'varchar', length: 1000})
    rol: string

    @Column({type: 'varchar', length: 1000})
    password: string

    @Column({type: 'varchar', length: 5000})
    usuario: string

    @Column({type: 'varchar', length: 1000})
    nombre: string

}
