import { Request, Response } from 'express';
import { SmallpoxModel } from '../../../data/models/smallpox.model';

export class SmallpoxController {
    public getSmallpox = async (req: Request, res: Response) => {
        try {
            const smallpox = await SmallpoxModel.find();
            return res.json(smallpox);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los casos" });
        }
    }

    public getsmallpoxLastWeek = async (req: Request, res: Response) => {
        try {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

            const smallpoxs = await SmallpoxModel.find({ creationDate: { $gte: oneWeekAgo } });
            return res.json(smallpoxs);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los casos de la última semana" });
        }
    }


    public createSmallpox = async (req: Request, res: Response) => {
        try {
            const { lat, lng, genre, age } = req.body;
            const newsmallpox = await SmallpoxModel.create({
                lat,
                lng,
                genre,
                age,
                creationDate: new Date(),
                isSent: false
            });
            res.json(newsmallpox);
        } catch (error:any) {
            if (error.name === 'ValidationError') {

                return res.status(400).json({ message: "Datos inválidos: " + error.message });
            }
            return res.status(500).json({ message: "Error al crear el caso" });
        }
    }  

  
    public getSmallpoxById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const smallpox = await SmallpoxModel.findById(id);
            if (!smallpox) {
                return res.status(404).json({ message: "Caso no encontrado" });
            }
            return res.json(smallpox);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener el caso" });
        }
    }

    
    public updateSmallpox = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { lat, lng, genre, age, isSent } = req.body;
    
            const updatedsmallpox = await SmallpoxModel.findByIdAndUpdate(
                id,
                { lat, lng, genre, age, isSent },
                { new: true, runValidators: true }
            );
    
            if (!updatedsmallpox) {
                return res.status(404).json({ message: "Caso no encontrado" });
            }
    
            return res.json(updatedsmallpox);
        } catch (error:any) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: "Datos inválidos: " + error.message });
            }
            return res.status(500).json({ message: "Error al actualizar el caso" });
        }
    }

    
    public deleteSmallpox = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const smallpox = await SmallpoxModel.findByIdAndDelete(id);

            if (!smallpox) {
                return res.status(404).json({ message: "Caso no encontrado" });
            }
            return res.json({ message: "Caso eliminado" });
        } catch (error) {
            return res.status(500).json({ message: "Error al eliminar el caso" });
        }
    }
}
