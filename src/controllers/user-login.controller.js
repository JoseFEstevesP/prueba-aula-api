import coder from '#Functions/coder.js';
import { User } from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';
const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (!existingUserByEmail)
    return res.status(401).send({ errors: ['Credenciales incorrectas'] });
  const checkPassword = await compare(password, existingUserByEmail.password);
  if (!checkPassword)
    return res.status(401).send({ errors: ['Credenciales incorrectas'] });
  const jwtConstructor = new SignJWT({
    id: existingUserByEmail.uid,
    uidRol: existingUserByEmail.uidRol,
  });
  const jwt = await jwtConstructor
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(coder(process.env.JWT_PRIVATE_KEY));
  return res.send({ JWT: jwt });
};
export default userLoginController;
