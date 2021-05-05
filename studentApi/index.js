const students = require('./data/students.json');
const express = require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');
// const { list, all, allStudents } = require('./controllers/StudentController');

const db = require("./models");
// { force: true }
db.sequelizeConnect.sync().then(() => {

  // console.log("[+] Seeding...")
  // try{ students.forEach(async (student) => {
  //     var result = await db.student.create(student);
  //     console.log(`[+] Student ${result.firstname} ajouté`)
  //     } 
  // )}
  // catch(err){ console.log(err.message)}

  // db.grades.create({ 
  //     grades:10,
  //     studentId:3
  // })
  app.use(express.json())
  // const gradePromise = async (req,res)=>{
  //   try{
  //     await console.log(req.body)
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
    next()
  })

  const setGrade = (req,res,next)=>{
    console.log(req.body)
    console.log(typeof req.body.grades)
    console.log(typeof req.body.studentId)

    db.grades.create({ 
      grades:req.body.grades,
      studentId:req.body.studentId
    })
    return res.send(200,{message:"ok"})
  
  }

  const getStudents = async (req,res,next)=>{
    const students = await db.student.findAll();
    // console.log(students.every(user => user instanceof Student)); // true
    console.log("All students:", JSON.stringify(students, null, 2));  
       res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS")
    return res.send(200, JSON.stringify(students, null, 2))
  }
  app.post('/grades',setGrade)
  app.get('/students',getStudents) 

  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
    console.log("Drop and re-sync db.");
  })
})
// // setting du moteur de rendu
// app.set('view engine', 'pug');

// // routage
// app.get('/', (req, res) => {
//   res.send('coucou');
// })

// app.get('/test1', (req, res) => {

//   const { title } = req.query;
//   var view = '';
//   if (title) {
//     view = `
//     <html>
//       <head>
//         <title>${title}</title>
//       </head>
//       <body>
//         <h1 style="color:orange">${title}</h1>
//       </body>
//     </html>
//   `;
//   } else {
//     view = 'Bad request';
//   }

//   res.send(view);
// })

// app.get('/test2', (req, res) => {
//   var view = fs.readFileSync('templates/test2.aston');
//   var {title} = req.query;
//   var viewStr = view.toString();
//   var newView = 
//   viewStr
//     .replace('[[ title ]]', title)
//     .replace('[[ title ]]', title);
  
//   res.send(newView);
// })

// app.get('/test3', (req, res) => {
//   res.render('test3', { 
//     title: req.query.title, 
//     students: ['Jérérmy','Clémentine','Umberto'] })
// })

// app.get('/student', (req, res) => {
//   var students = list();
//   res.render('student/list', { students })
// })

// // lien direct entre une route à une méthode de contrôleur
// app.get('/student/all', allStudents)