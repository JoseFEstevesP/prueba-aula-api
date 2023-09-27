import { permissions } from '#Constants/permissions.js';
import { validatePermissions } from '#Functions/validatePermissions.js';

const profilePermissions = async (req, res, next) => {
  const { uidRol } = req;
  const validate = validatePermissions({ uidRol, per: permissions.profile });
  if (!validate)
    return res.status(401).send({ errors: ['Usuario no autorizado'] });
  next();
};

export default profilePermissions;
