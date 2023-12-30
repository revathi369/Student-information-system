const express = require('express')
const mongoose = require('mongoose')
const Student = require('./models/student')
const app = express()
//routes
app.use(express.json())
//To encode it with url
app.use(express.urlencoded({extended : false}))
app.get('/', (req, res)=>{
    res.send("Hello Node API")
})
app.get('/blog', (req, res)=>{
    res.send("Hello")
})
//To fetch all data
app.get('/student', async(req, res) =>{
    try{

        const students = await Student.find({});
        res.status(200).json(students);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//To fetch by id
app.get('/student/:id', async(req, res) =>{
    try{
        const{id} = req.params;
        const student = await Student.findById(id);
        res.status(200).json(student);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//To post data
app.post('/student', async(req, res) => {
    try{
        const student = await Student.create(req.body)
        res.status(200).json(student);

    }catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message})
    }
})
//To update data by id
app.put('/student/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const student = await Student.findByIdAndUpdate(id, req.body);
        if(!student){
            return res.status(404).json({message : `cannot find this student ID ${id}`})
        }
        const updatedstudent = await Student.findById(id);
        res.status(200).json(updatedstudent);
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})
//To delete a student 
app.delete('/student/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const student = await Student.findByIdAndDelete(id);
        if(!student){
            return res.status(404).json({message : `cannot find student ID ${id}`})
        }
        res.status(200).json(student);
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})
//mongoose.set("strictQuery" , false)
mongoose.connect('mongodb+srv://20501a05c0:Revathi54@studentapi.jufsjac.mongodb.net/Student-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('Connected to MongoDB')
    app.listen(3000, ()=>{
        console.log("Node API is running on port 3000")
    });
}).catch((error) =>{
    console.log(error)
})
