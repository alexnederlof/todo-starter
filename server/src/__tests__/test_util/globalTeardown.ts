import { sequelize } from '../../sequalize';

export default async function() {
  await sequelize.close();
}
