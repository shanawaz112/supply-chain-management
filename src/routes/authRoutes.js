const router = require("express").Router();

router.post('/login', require('../controllers/auth/loginController'));

router.post('/signup', require('../controllers/auth/signUpController'));

module.exports = router;
