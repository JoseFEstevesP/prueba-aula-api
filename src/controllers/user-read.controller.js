import { sequelize } from '#Config/db.js';
import { QueryTypes } from 'sequelize';

const userReadController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const user = await sequelize.query(
    `SELECT * FROM pbu2w_users LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
    {
      type: QueryTypes.SELECT,
    },
  );
  return res.status(200).send({
    rows: user,
  });
};

export default userReadController;
