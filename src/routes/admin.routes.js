const express = require('express');
const adminRoutes = express.Router();
const { isAuthenticated } = require('../helpers/authenticated');
const {
    dashboard,
    getAllStudents,
    addNewStduent,
    updateStudent
} = require('../controllers/admin.controller');


adminRoutes.get('/dashboard', isAuthenticated, dashboard);

adminRoutes.get('/students', isAuthenticated, getAllStudents);

adminRoutes.post('/students', isAuthenticated, addNewStduent);

adminRoutes.post('/students/:id/update', isAuthenticated, updateStudent);

module.exports = adminRoutes;
