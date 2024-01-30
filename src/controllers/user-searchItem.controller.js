import { sequelize } from '#Config/db.js';
import { QueryTypes } from 'sequelize';

const userSearchItemController = async (req, res) => {
  const { id } = req.params;
  const user = await sequelize.query(
    `SELECT * FROM pbu2w_users WHERE id=${id}`,
    {
      type: QueryTypes.SELECT,
    },
  );
  if (!user)
    return res
      .status(404)
      .send({ errors: ['No se a encontrado ningún usuario'] });
  return res.status(200).send(user);
};

export default userSearchItemController;
