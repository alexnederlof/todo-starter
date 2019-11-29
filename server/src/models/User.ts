import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { Permission } from '../generated/graphql';

export class User extends Model {
  public id!: number;
  public name!: string;
  public avatar?: string;
  public deactivated!: boolean;
  public permissions!: Permission[];
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
      email: {
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
        defaultValue: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM('MANAGE_USERS', 'MODIFY_PERMISSIONS')),
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      sequelize,
      tableName: 'users',
    }
  );
}
