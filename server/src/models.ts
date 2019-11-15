import { getLocation } from 'graphql';
import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export class Todo extends Model {
  public id!: number;
  public name!: string;
  public complete!: boolean;
}

export const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'todo',
  username: process.env.DB_USER || 'todo',
  password: process.env.DB_PASS || 'todo-secret',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
  hooks: {
    afterConnect: conn => console.debug(`😁 Database Connected!`),
    beforeConnect: conn => console.debug(`🔗 Connecting to ${conn.database} at ${conn.host}`),
    beforeDisconnect: () => console.debug('👋 Disconnecting from DB'),
  },
});

Todo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'todos',
  }
);
