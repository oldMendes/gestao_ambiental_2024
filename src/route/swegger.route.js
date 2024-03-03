import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "../swagger.json" assert { type: "json" }

export const sweggerRoute = Router();

sweggerRoute.use('/', swaggerUi.serve);
sweggerRoute.get('/', swaggerUi.setup(swaggerDocument));