import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export class Todo extends Model {
  public id!: number;
  public name!: string;
  public complete!: boolean;
}

export function init(sequelize: Sequelize) {
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
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'todos',
    }
  );
}
