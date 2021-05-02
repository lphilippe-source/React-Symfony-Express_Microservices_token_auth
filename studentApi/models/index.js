const Sequelize = require("sequelize");
const { USER, PASSWORD,HOST,DB } = require("../config/database.js");
const sequelizeConnect = new Sequelize({dialect: 'mysql',
    host: HOST,
    database: DB,
    username: USER,
    password: PASSWORD,
    define:{
        freezeTableName: true
    }
},
)
const db = {}
// const db2 = {}
db.Sequelize = Sequelize;
db.sequelizeConnect = sequelizeConnect;
// db2.Sequelize = Sequelize;
// db2.sequelizeConnect = sequelizeConnect;
db.student = require("./student.js")(db.sequelizeConnect, Sequelize),
db.grades = require("./grades.js")(db.sequelizeConnect, Sequelize)

Object.keys(db).forEach((model)=>{
    console.log(model)
    if('associate' in db[model]){
        db[model].associate(db)
    }
})

// (async () => {
// // détruire la table student si elle existe
//     console.log("[+] Détruit la table student si existe")
//     await db.sequelizeConnect.query('DROP TABLE IF EXISTS student'); // raw query
//     console.log("[+] Synchronisation du modèle et de la table student")

//     // db.sequelizeConnect.sync();
//     await sequelizeConnect.sync();
//     console.log("[+] Seeding...")
//     try{ students.forEach(async (student) => {
//         var result = await db.student.create(student);
//         console.log(`[+] Student ${result.firstname} ajouté`)
//         } 
//     )}
//     catch(err){ console.log(err.message)}
// })()
// .catch(err => console.log(err))

module.exports = db;