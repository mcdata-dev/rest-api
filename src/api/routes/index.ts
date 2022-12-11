import type { Request, Response } from 'express';
import type HttpServer from '../HttpServer';
import { ModulesMiddleware } from '../middleware';
import HealthRoute from './HealthRoute';

/**
 * Initialize routes
 * @param server HttpServer
 */
export const initRoutes = (server: HttpServer): void => {
  const { options, application } = server;

  ModulesMiddleware.register(server);

  application.use(`${options.prefix}/health`, new HealthRoute(server).router);
  application.use('', (req: Request, res: Response): Response => {
    return res.status(404).json({ error: 'UNKNOWN_ENDPOINT', message: 'We could not find any referring endpoint.' });
  });
};
