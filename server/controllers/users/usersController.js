const { Users } = require('../../models');
const bcryptjs = require('bcryptjs');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const findUserEmail = await Users.find({ email });
    if (findUserEmail != '') return res.json({ err: 'Email already exist.' });

    const avatar = 'https://api.dicebear.com/5.x/adventurer/svg?seed=' + email;

    const hashPassword = await bcryptjs.hash(password, 10);

    const createUser = await Users.create({
      name,
      email,
      password: hashPassword,
      avatar,
    });

    return res.json(createUser);
  } catch (error) {
    next(error);
  }
};

const searchUser = async (req, res, next) => {
  try {
    if (!req.session.user_id) return res.json({ isLoggedIn: false });

    const id = req.session.user_id;
    const key = req.params.key;

    const findUser = await Users.find({
      $and: [
        { _id: { $ne: id } },
        {
          $or: [
            {
              name: { $regex: key.toString(), $options: 'i' },
            },
            {
              email: { $regex: key.toString(), $options: 'i' },
            },
          ],
        },
      ],
    });

    return res.json({ findUser, isLoggedIn: true });
  } catch (error) {
    next(error);
  }
};

const fetchAllUser = async (req, res, next) => {
  try {
    if (!req.session.user_id) return res.json({ isLoggedIn: false });

    const id = req.session.user_id;

    const findUser = await Users.find({
      _id: { $ne: id },
    });

    return res.json({ findUser, isLoggedIn: true });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    if (!req.session.user_id) return res.json({ isLoggedIn: false });

    const _id = req.params.id;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) return res.json({ err: true });

    const findUser = await Users.findById({
      _id,
    });

    return res.json({ findUser, isLoggedIn: true });
  } catch (error) {
    next(error);
  }
};

const isLoggedIn = async (req, res, next) => {
  try {
    if (!req.session.user_id) return res.json({ isLoggedIn: false });

    const _id = req.session.user_id;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) return res.json({ isLoggedIn: false });

    const findUser = await Users.findById({ _id });

    if (!findUser) return res.json({ findUser: null, isLoggedIn: true });

    return res.json({ findUser, isLoggedIn: true });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await Users.findOne(
      { email },
      '_id name password email avatar isOnline'
    );

    if (!findUser)
      return res.json({ err: 'Incorrect email', isLoggedIn: false });

    bcryptjs.compare(password.toString(), findUser?.password).then((match) => {
      if (!match)
        return res.json({
          err: 'Incorrect email and password',
          isLoggedIn: false,
        });

      req.session.user_id = findUser._id.toJSON();

      return res.json({ findUser, isLoggedIn: true });
    });
  } catch (e) {
    next(e);
  }
};

const userLogout = async (req, res, next) => {
  try {
    if (!req.session.user_id) return res.json({ isLoggedIn: false });

    req.session.destroy(function (err) {});
    res.clearCookie('user_id');

    return res.json({ isLoggedIn: false });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    if (!req.session.user_id) return res.json({ isLoggedIn: false });

    const _id = req.session.user_id;
    const { avatar, name, password } = req.body;

    const findUser = await Users.findById({ _id });

    if (avatar != null) {
      findUser.avatar = avatar;
    }

    if (password !== '') {
      const hashPassword = await bcryptjs.hash(password, 10);
      findUser.password = hashPassword;
    }

    if (name !== '') {
      findUser.name = name;
    }

    await findUser.save();
    return res.json({ success: 'Your profile was successfully updated.' });
  } catch (error) {
    next(e);
  }
};

module.exports = {
  createUser,
  searchUser,
  getUser,
  isLoggedIn,
  userLogin,
  userLogout,
  fetchAllUser,
  updateUser,
};
