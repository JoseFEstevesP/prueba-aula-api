import { User } from '#Schemas/user.schema.js';
const userProfileController = async (req, res) => {
  const { id } = req;
  const existingUserById = await User.findByPk(id);
  if (!existingUserById)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  const { uid, name, surname, email } = existingUserById;
  return res.send({ uid, name, surname, email });
};
export default userProfileController;
