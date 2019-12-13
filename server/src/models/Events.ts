import { DataTypes, Model, NOW, Sequelize } from 'sequelize';
import { User } from './User';

export class Event extends Model {
  public id!: number;
  public at!: Date;
  public by!: number;
  public meta!: object;
}

export function init(sequelize: Sequelize) {
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: NOW,
      },
      by: {
        type: DataTypes.INTEGER,
        references: {
          model: User,
          key: 'id',
        },
      },
      meta: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {},
      },
    },
    {
      sequelize,
      tableName: 'events',
    }
  );
}
