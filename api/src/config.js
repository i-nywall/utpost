// TODO: use environment variable for password too
// if env not set it fallbacks to our old values
export const config = {
  postgresUrl: process.env.POSTGRES_URL ?? 'postgres://utpost:utpost@localhost:5433/utpost',
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://utpost:utpost@localhost:27017/utpost?authSource=admin',
  jwtSecret: 'utpost-super-secret-2021',
  port:  Number(process.env.PORT ?? 4000),
  uploadDir: './uploads',
};
