const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { 
        type: String,  
    },
    lastName: { 
        type: String, 
    },
    
    status: { 
        type: String, 
        enum: ['Inquiry','Demo In', 'Admission', 'Demo Drop', 'Cancle Admission'],
        default: 'Inquiry' 
    }
},
{
    versionKey: false
});

module.exports = mongoose.model('students', studentSchema);