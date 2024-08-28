const Student = require('../models/student.model');


exports.dashboard = async (req, res) => {
    const demoStudents = await Student.countDocuments({ status: 'Demo In' });
    const admissionStudents = await Student.countDocuments({ status: 'Admission' });
    const inquieryStudents = await Student.countDocuments({ status: 'Inquiry' });
    const dropStudents = await Student.countDocuments({ status: 'Demo Drop' });
    const cancelAdmission = await Student.countDocuments({ status: 'Cancel Admission' });
    const totalStudents = await Student.countDocuments({ });
    res.render('dashboard', { demoStudents, admissionStudents, inquieryStudents, dropStudents, cancelAdmission,totalStudents });
};

exports.getAllStudents = async (req, res) => {
    const students = await Student.find();
    res.render('students', { students, user: req.user });
};

exports.addNewStduent = async (req, res) => {
    await Student.create({ ...req.body });
    res.redirect('/admin/students');
};

// exports.updateStudent = async (req, res) => {
//     await Student.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, { new: true });
//     res.redirect('/admin/students');
// };

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, status } = req.body;
    try {
        await Student.findByIdAndUpdate(id, { firstName, lastName,status });
        res.redirect('/admin/students');
    } catch (err) {
        console.error(err);
        res.redirect('/auth/login');
    }
};
