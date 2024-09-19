import { Router } from "express";
import { SmallpoxController } from "./controller";

export class smallpoxRoutes{
    static get routes(){
        const router = Router();
        const controller = new SmallpoxController();
        router.get("/",controller.getSmallpox);
        router.post("/",controller.createSmallpox);
        router.get("/last-week",controller.getsmallpoxLastWeek);
        router.get("/:id",controller.getSmallpoxById);
        router.put("/:id",controller.updateSmallpox);
        router.delete("/:id",controller.deleteSmallpox);
        return router
    }
}