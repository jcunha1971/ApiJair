const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', AuthController.register);
router.get('/readusers', AuthController.readUsers);
router.get('/readusers/:id', AuthController.readUserById);
router.patch('/updateusers/:id', AuthController.updateUserById);
router.delete('/deleteusers/:id', AuthController.deleteUserById);
router.post('/authenticate', AuthController.authenticate);

module.exports = router;