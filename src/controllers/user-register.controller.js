/* eslint-disable camelcase */
import { sequelize } from '#Config/db.js';
import bcrypt from 'bcrypt';
import moment from 'moment'; // Importar moment.js para manejar fechas
import { QueryTypes } from 'sequelize';

const userRegisterController = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      block = 0,
      sendEmail = 0,
      params = '{"admin_style":"","admin_language":"","language":"","editor":"","timezone":"","a11y_mono":"0","a11y_contrast":"0","a11y_highlight":"0","a11y_font":"0"}',
      resetCount = 0,
      requireReset = 0,
    } = req.body;

    // Validación de datos:
    if (!name || !username || !email || !password) {
      return res.status(400).send({ msg: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe en la base de datos:
    const existingUser = await sequelize.query(
      `SELECT * FROM pbu2w_users WHERE username = ? OR email = ?;`,
      {
        type: QueryTypes.SELECT,
        replacements: [username, email],
      },
    );

    if (existingUser.length > 0) {
      return res.status(400).send({ msg: 'El usuario ya existe' });
    }

    // Hasheo de contraseña (usando bcrypt):
    const hashedPassword = await bcrypt.hash(password, 10); // Ejemplo con bcrypt

    // Asignación de fechas:
    const registerDate = moment();
    const lastvisitDate = moment();

    // Transaction to ensure both inserts succeed or fail together:
    await sequelize.transaction(async (t) => {
      // Insert into pbu2w_users table:
      await sequelize.query(
        `INSERT INTO pbu2w_users (
           name,
           username,
           email,
           password,
           params,
           block,
           sendEmail,
           registerDate,
           lastvisitDate,
           resetCount,
           requireReset
         ) VALUES (
           ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
         );`,
        {
          type: QueryTypes.INSERT,
          replacements: [
            name,
            username,
            email,
            hashedPassword,
            params,
            block,
            sendEmail,
            registerDate.format('YYYY-MM-DD HH:mm:ss'),
            lastvisitDate.format('YYYY-MM-DD HH:mm:ss'),
            resetCount,
            requireReset,
          ],
          transaction: t, // Use the transaction
        },
      );

      // Retrieve the generated user_id:
      const userId = await sequelize.query('SELECT LAST_INSERT_ID();', {
        transaction: t,
      });
      const user_id = userId[0][0]['LAST_INSERT_ID()']; // Extrae el valor ID

      // Inserta en la tabla pbu2w_user_usergroup_map:
      await sequelize.query(
        `INSERT INTO pbu2w_user_usergroup_map (user_id, group_id) VALUES (?, ?);`,
        {
          type: QueryTypes.INSERT,
          replacements: [user_id, 2], // Usa sequelize.literal para evitar el escape
          transaction: t,
        },
      );
    });

    // Respuesta exitosa:
    return res.status(201).send({ msg: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    // Manejar el error y enviar una respuesta adecuada
    return res.status(500).send({ msg: 'Error al registrar el usuario' });
  }
};

export default userRegisterController;
