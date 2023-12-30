const mongoose = require('mongoose')
const studentSchema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "Please enter the student name"]
        },
        rollno : {
            type : Number,
            required : true
        }, 
        department : {
            type : String,
            required : [true, "Please enter valid department name"]
        },
        class : {
            type : Number,
            required : true,
        }
    },
    {
        timestamps : true
    }
)

const Student = mongoose.model('Student',studentSchema );
module.exports= Student;