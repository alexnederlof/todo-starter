import { Sequelize } from 'sequelize';
import { init as userInit } from './models/User';

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'my_app',
  username: process.env.DB_USER || 'my_app',
  password: process.env.DB_PASS || 'my_app_secret',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
  hooks: {
    afterConnect: conn => console.debug(`😁 Database Connected!`),
    beforeConnect: conn => console.debug(`🔗 Connecting to ${conn.database} at ${conn.host}`),
    beforeDisconnect: () => console.debug('👋 Disconnecting from DB'),
  },
});

userInit(sequelize);
