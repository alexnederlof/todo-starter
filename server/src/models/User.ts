import { DataTypes, Model, Op, Sequelize } from 'sequelize';
import { Permission } from '../generated/graphql';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: String;
  public avatar?: string;
  public deactivated!: boolean;
  public permissions!: Permission[];

  public static async search(query?: string | null) {
    if (!query?.length) {
      return await User.findAll({});
    } else {
      const matchers = query
        .split(' ')
        .filter(q => q.length > 0)
        .map(q => `%${q.toLocaleLowerCase()}%`)
        .map(q => ({
          [Op.or]: [
            {
              name: {
                [Op.iLike]: q,
              },
            },
            {
              email: {
                [Op.iLike]: q,
              },
            },
          ],
        }));

      return await User.findAll({
        where: {
          [Op.or]: matchers,
        },
      });
    }
  }
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
        unique: true,
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
