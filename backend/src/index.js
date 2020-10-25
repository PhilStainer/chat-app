import { app } from './app';
import { accessEnv } from './utils/accessEnv';
import { logger } from './utils/logger';
import { db } from './utils/dbConnection';

const PORT = accessEnv('PORT', 4000);

(async () => {
  await db.connect();

  await app.listen(PORT, () =>
    logger.info(`🚀 Started on http://localhost:${PORT}/`)
  );
})();
