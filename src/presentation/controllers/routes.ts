import {Router} from "express"
import { smallpoxRoutes } from "./smallpox/routes";

export class AppRoutes{
    static get routes() : Router{
        const router = Router();
        router.use("/api/viruelamono",smallpoxRoutes.routes);
        return router;
    }
}