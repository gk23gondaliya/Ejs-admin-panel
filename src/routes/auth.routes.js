const express = require('express');
const authRoutes = express.Router();
const { isAuthenticated } = require('../helpers/authenticated');
const authController = require('../controllers/auth.controller');
const { upload } = require('../helpers/imageUpload');

authRoutes.get('/login', authController.showLogin);
authRoutes.post('/login', authController.login);

authRoutes.get('/register', authController.showRegister);
authRoutes.post('/register', upload.single('profileImage'), authController.registerUser);

authRoutes.get('/profile', isAuthenticated, authController.showProfile);
authRoutes.get('/logout', isAuthenticated, authController.logout);

module.exports = authRoutes;
