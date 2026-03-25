import express from 'express';
import { NotFound } from './model/error/NotFound';
import { SystemError } from './model/error/SystemError';
import { ValidationError } from './model/error/ValidationError';
import { ResourceConflict } from './model/error/ResourceConflict';
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './routes/swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.originalUrl == "/api-docs") return res.redirect('api-docs/')
    next()
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

RegisterRoutes(app);

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  throw new NotFound('requested uri not found.');
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  switch (error.constructor) {
    case NotFound:
      res.status(404).json(error);
      break;
    case ValidationError:
      res.status(400).json(error);
      break;
    case ResourceConflict:
      res.status(409).json(error);
      break;
    default:
      res.status(500).json(new SystemError(error.message));
      break;
  }
});

export default app;