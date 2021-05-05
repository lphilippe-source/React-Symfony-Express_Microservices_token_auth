const students = require('./data/students.json');
const express = require('express');
const https = require('https')
const app = express();
const PORT = 8080;
const fs = require('fs');
const axios = require('axios')
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

  const setGrade = (req, res, next) => {
    console.log(req.body)
    console.log(typeof req.body.grades)
    console.log(typeof req.body.studentId)

    db.grades.create({
      grades: req.body.grades,
      studentId: req.body.studentId
    })
    return res.send(200, { message: "ok" })

  }

  const getStudents = async (req, res, next) => {
    const students = db.student.findAll();
    // console.log(students.every(user => user instanceof Student)); // true
    console.log("All students:", JSON.stringify(students, null, 2));
    console.log('token: ', req.header("Authorization"))
    const httpsAgent = new https.Agent({
      cert: fs.readFileSync('./security/cert.pem'),
      key: fs.readFileSync('./security/key.pem')
      // ca: fs.readFileSync('ca.crt'),
    });
    const instance = axios.create({
      headers: {
        'Authorization': req.header("Authorization"),
        'Content-Type': 'application/json',
        'User-Agent': 'Axios 0.21.1'
      }

    })
    instance.get('https://localhost:8000/api/check_token',{ httpsAgent })
      .then((data) => {
        console.log("databody: ", data)
      })
      .then(() => res.status(200).send(JSON.stringify(students, null, 2)))
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
  }
  app.post('/grades', setGrade)
  app.get('/students', getStudents)

  const httpsOptions = {
    key: fs.readFileSync('./security/key.pem'),
    cert: fs.readFileSync('./security/cert.pem')
  }
  https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('Server running on port ' + PORT);
    console.log("Drop and re-sync db.");
  })
})