import { User } from '#Schemas/user.schema.js';

const userUpdateDataController = async (req, res) => {
  const { id } = req;
  const { name, surname } = req.body;
  const existingUserById = await User.findByPk(id);
  if (!existingUserById)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  existingUserById.name = name;
  existingUserById.surname = surname;
  await existingUserById.save();
  return res.send({ msg: 'Usuario actualizado' });
};
export default userUpdateDataController;
