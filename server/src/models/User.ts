import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export class User extends Model {
  public id!: number;
  public name!: string;
  public complete!: boolean;
}

export function init(sequelize: Sequelize) {
  User.init(
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
      avatar: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deactivated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      roles: {
        type: DataTypes.ENUM(
          'PROPOSE_RESPONSIBILITY',
          'APPROVE_RESPONSIBILITY',
          'REMOVE_RESPONSIBILITY',
          'MANAGE_USERS'
        ),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );
}
