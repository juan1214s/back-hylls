import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { Artista } from "./artista"

@Entity('foto')
export class Foto extends BaseEntity{

    @PrimaryGeneratedColumn()
    Id_foto: number

    @Column({type: 'varchar', length: 1000})
    url: string

    @Column({type: 'varchar', length: 1000})
    id_imgur: string

    @ManyToOne(() => Artista, artista => artista.foto)
    artista: Artista;

}