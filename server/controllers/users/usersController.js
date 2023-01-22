const { Users } = require('../../models');
const bcryptjs = require('bcryptjs');

const createUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const findUser = await Users.find({ username });

    if (findUser != '') return res.json({ err: 'Username already exist.' });

    const hashPassword = await bcryptjs.hash(password, 10);

    const createUser = await Users.create({
      name,
      username,
      email,
      password: hashPassword,
    });

    return res.json(createUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };
