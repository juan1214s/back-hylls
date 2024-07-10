import { Play_list } from "../../entities/play_list";
import { Request, Response } from "express";
import { AppDataSource } from "../../db";

export const obtenerPlaylistId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "ID del play list es requerido." });
    }

    const playList = await AppDataSource.getRepository(Play_list).findOne({
      where: { Id_playlist: Number(id) },
      relations: ['imagenes']
    });

    if (!playList) {
      return res.status(404).json({ error: "La play list no existe" });
    }

    res.status(200).json(playList);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error interno al intenta obtener el play list." });
  }
};
