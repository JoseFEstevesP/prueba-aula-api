import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';

const createPermissions = async (req, res, next) => {
  const { uidRol } = req;
  const validate = validatePermissions({ uidRol, per: permissions.create });
  if (!validate)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  next();
};

export default createPermissions;
