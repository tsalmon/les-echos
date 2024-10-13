import { registerAs } from '@nestjs/config';

/**
 * Pour éviter de manipuler directement les variables d'environnements dans les services
 */
export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET,
  };
});
