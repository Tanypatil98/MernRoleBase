const express = require('express');
const { check } = require('express-validator');
const usersControllers = require('../controllers/users-controllers');
const checkAuth = require('../utility/middleware/check-auth');
const { checkRole } = require('../utility/middleware/check-role');

const router = express.Router();

router.get('/', checkAuth, checkRole("Principal"), usersControllers.getUsers);
router.post('/addTeacher',
[
    check('name').not().isEmpty(),
    check('email').isEmail().normalizeEmail(),
    check('password').isLength({min:8}),
    check('role').not().isEmpty(),
],
 checkAuth, checkRole("Principal"), usersControllers.addTeacher);
router.post('/deleteTeacher/:tid', checkAuth, checkRole("Principal"), usersControllers.deleteTeacher);

router.post('/login',
    [
        check('email').isEmail().normalizeEmail(),
        check('password').isLength({min:8})
    ],
    usersControllers.login);

module.exports = router;