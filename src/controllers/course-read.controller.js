import { sequelize } from '#Config/db.js';
import { QueryTypes } from 'sequelize';

const courseReadController = async (req, res) => {
  const course = await sequelize.query('SELECT * FROM pbu2w_guru_program', {
    type: QueryTypes.SELECT,
  });
  return res.status(200).send({ course });
};

export default courseReadController;
