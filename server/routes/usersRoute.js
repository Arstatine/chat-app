const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth_cookie');

const { usersController } = require('../controllers');

router
  .route('/')
  .post(auth, usersController.createUser)
  .get(auth, usersController.isLoggedIn);

router.route('/all').get(auth, usersController.fetchAllUser);

router.route('/login').post(auth, usersController.userLogin);
router.route('/logout').get(auth, usersController.userLogout);

router.route('/:id').get(auth, usersController.getUser);
router.route('/search/:key').get(auth, usersController.searchUser);

module.exports = router;
