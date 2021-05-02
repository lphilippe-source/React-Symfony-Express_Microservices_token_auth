// const connection = require('../config/database');
// connection.connect();
// const dbConfig = require("../config/database.js");
// const students = ['Jérémy', 'Chris', 'Clémentine'];
// const db = require("../models"); // models path depend on your structure
// const Students = db.student;

// const setGradetoStudent =await Grades.create()=>{

// }
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const Student = {
    id: req.body.id,
    name: req.body.name,
    // published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Student.create(Students)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
// const list = () => {
//   return students ;
// }

// const all = (req, res) => {
//   res.render('student/list', { students });
// }

// const allStudents = (req, res) => {

//   // dialogue avec couche des données
//   connection.query('select * from student', (err, results, fields) => {
    
//     var students  = results.map(student => student.name);
//     res.render('student/list', { students });
//   })

  //connection.end();
// }

// module.exports = { list, all, allStudents }