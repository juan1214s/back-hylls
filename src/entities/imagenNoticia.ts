import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Noticia } from "./noticia";

@Entity('imagenNoticia')
export class ImagenNoticia extends BaseEntity {

    @PrimaryGeneratedColumn()
    Id_imagen: number;

    @Column({ type: 'varchar', length: 1000 })
    url: string;

    @Column({ type: 'varchar', length: 1000 })
    id_imgur: string;

    @ManyToOne(() => Noticia, noticia => noticia.imagenes)
    @JoinColumn({ name: 'noticiaId' })  // Asegúrate de que la columna FK se llame noticiaId
    noticia: Noticia;
}
